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
                log.LogError(e, "Unexpected error occurred while executing GetAllAccounts");
                return new BadRequestObjectResult("Unexpected error occurred while executing GetAllAccounts");
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
                log.LogError(e, $"Unexpected error occurred while executing {nameof(UpdateAccount)}");
                return new BadRequestObjectResult($"Unexpected error occurred while executing {nameof(UpdateAccount)}");
            }
        }
    }
}
