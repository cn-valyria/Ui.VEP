using System;
using System.Threading.Tasks;
using System.Web.Http;
using Functions.Auth;
using Functions.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

namespace Functions
{
    public class UserEntryPoint
    {
        private readonly ITokenProvider _tokenProvider;
        private readonly IAuthenticationProvider _authenticationProvider;

        public UserEntryPoint(ITokenProvider tokenProvider, IAuthenticationProvider authenticationProvider)
        {
            _tokenProvider = tokenProvider;
            _authenticationProvider = authenticationProvider;
        }

        [FunctionName(nameof(Authenticate))]
        public async Task<IActionResult> Authenticate(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "user/authenticate")] HttpRequest request,
            ILogger logger)
        {
            logger.LogInformation($"Beginning execution for {nameof(Authenticate)} method...");

            var account = new VepAccount
            {
                NationId = request.Query["nationId"],
                RulerName = request.Query["rulerName"],
                UniqueCode = request.Query["uniqueCode"]
            };

            if (string.IsNullOrEmpty(account.UniqueCode))
                return new BadRequestObjectResult("Must provide a uniqueCode parameter in the request");

            if (string.IsNullOrEmpty(account.NationId) && string.IsNullOrEmpty(account.RulerName))
                return new BadRequestObjectResult("Must provide either a nationId or rulerName parameter in the request");

            try
            {
                if (!await _authenticationProvider.IsAuthenticated(account))
                    return new UnauthorizedResult();

                logger.LogInformation($"Account (NationId: {account.NationId}, RulerName: {account.RulerName}, UniqueCode: {account.UniqueCode}) was authenticated");

                var newJwtToken = _tokenProvider.GenerateToken(account);
                return new OkObjectResult(newJwtToken);
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(Authenticate)}", e);
                logger.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }
    }
}
