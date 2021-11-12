using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Repository;
using Repository.DTO;
using Repository.Infrastructure;
using System.Linq;
using System.Web.Http;

namespace Functions
{
    public class AccountsEntryPoint
    {
        private readonly IAccountsRepository _accountsRepository;

        public AccountsEntryPoint(IAccountsRepository accountsRepository) => _accountsRepository = accountsRepository;

        [FunctionName(nameof(GetAllAccounts))]
        public async Task<IActionResult> GetAllAccounts(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "accounts")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(GetAllAccounts)} method...");

            try
            {
                var results = await _accountsRepository.GetAccountDetailsAsync();

                log.LogInformation("GetAllAccounts execution complete. Found {count} results.", results.Count());

                return new OkObjectResult(results);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(GetAllAccounts)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        [FunctionName(nameof(CreateAccount))]
        public async Task<IActionResult> CreateAccount(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "accounts")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(CreateAccount)} method...");

            try
            {
                var newAccountRequest = await JsonSerializer.DeserializeAsync<NewAccountRequest>(
                    request.Body,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                log.LogInformation($"Received request to create account: {{ nationId: {newAccountRequest.NationId} }}");

                var createdAccount = await _accountsRepository.CreateAccountAsync(newAccountRequest);

                log.LogInformation($"Successfully created account with ID: {createdAccount.Id}");

                return new OkObjectResult(createdAccount);
            }
            catch (NotFoundException e)
            {
                log.LogWarning(e.Message);
                return new NotFoundObjectResult(e.Message);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(UpdateAccount)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        [FunctionName(nameof(UpdateAccount))]
        public async Task<IActionResult> UpdateAccount(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = "accounts")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(UpdateAccount)} method...");

            try
            {
                var content = await new StreamReader(request.Body).ReadToEndAsync();
                var accountToUpdate = JsonSerializer.Deserialize<AccountToUpdate>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                
                await _accountsRepository.UpdateAccountAsync(accountToUpdate);

                return new OkResult();
            }
            catch (NotFoundException e)
            {
                log.LogWarning(e.Message);
                return new NotFoundObjectResult(e.Message);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(UpdateAccount)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        [FunctionName(nameof(RemoveAccount))]
        public async Task<IActionResult> RemoveAccount(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "accounts/{id}")] HttpRequest request,
            int? id,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(RemoveAccount)} method...");

            if (id is null)
                return new BadRequestObjectResult("Must provide an ID to delete in the request");

            try
            {
                await _accountsRepository.RemoveAccountAsync(id.Value);
                return new OkResult();
            }
            catch (NotFoundException e)
            {
                log.LogWarning(e.Message);
                return new NotFoundObjectResult(e.Message);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(RemoveAccount)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        [FunctionName(nameof(FindProspectAccount))]
        public async Task<IActionResult> FindProspectAccount(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "accounts/prospect")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(FindProspectAccount)} method...");

            string nationIdParameter = request.Query["nationId"];
            if (!int.TryParse(nationIdParameter, out var nationId))
                return new BadRequestObjectResult("Must provide a nationId parameter in the request");

            try
            {
                var prospectAccount = await _accountsRepository.FindProspectAccountAsync(nationId);
                if (prospectAccount is null)
                {
                    var warning = $"No prospective merchant found by the provided parameters: {{ nationId: {nationId} }}.";
                    log.LogWarning(warning);
                    return new NotFoundObjectResult(warning);
                }

                log.LogInformation($"Successfully found a prospect for the provided parameters: {{ nationId: {nationId} }}!");
                return new OkObjectResult(prospectAccount);
            }
            catch (AlreadyExistsException e)
            {
                log.LogWarning(e.Message);
                return new ConflictObjectResult(e.Message);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(FindProspectAccount)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }
    }
}
