using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Repository;
using System.Linq;

namespace Functions
{
    public class AccountsEntryPoint
    {
        private readonly IAccountsRepository _accountsRepository;

        public AccountsEntryPoint(IAccountsRepository accountsRepository) => _accountsRepository = accountsRepository;

        [FunctionName("getAllAccounts")]
        public async Task<IActionResult> GetAll(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Beginning execution for GetAllAccounts method...");

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
    }
}
