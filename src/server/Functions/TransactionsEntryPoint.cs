using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Web.Http;
using Repository.DTO;
using Repository;
using System.ComponentModel;
using System.Linq;
using AutoMapper;
using Functions.Contracts;

namespace Functions
{
    public class TransactionsEntryPoint
    {
        private readonly ITransactionsRepository _transactionsRepository;
        private readonly IMapper _mapper;

        public TransactionsEntryPoint(ITransactionsRepository transactionsRepository, IMapper mapper)
            => (_transactionsRepository, _mapper) = (transactionsRepository, mapper);

        [FunctionName(nameof(SearchAidBasedTransactions))]
        public async Task<IActionResult> SearchAidBasedTransactions(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "transactions/aidBased")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(SearchAidBasedTransactions)} method...");

            try
            {
                var filters = ConvertToFilters(request.Query);
                var limit = ConvertFromQueryString<int>(request.Query["limit"]);
                var offset = ConvertFromQueryString<int>(request.Query["offset"]);

                var searchResults = await _transactionsRepository.SearchTransactions(TransactionType.AidBased, filters, limit ?? 100, offset ?? 0);

                return new OkObjectResult(_mapper.Map<TransactionSearchResults>(searchResults));
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(SearchAidBasedTransactions)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        [FunctionName(nameof(SearchManualTransactions))]
        public async Task<IActionResult> SearchManualTransactions(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "transactions/manual")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation($"Beginning execution for {nameof(SearchManualTransactions)} method...");

            try
            {
                var filters = ConvertToFilters(request.Query);
                var limit = ConvertFromQueryString<int>(request.Query["limit"]);
                var offset = ConvertFromQueryString<int>(request.Query["offset"]);

                var searchResults = await _transactionsRepository.SearchTransactions(TransactionType.Manual, filters, limit ?? 100, offset ?? 0);

                return new OkObjectResult(_mapper.Map<TransactionSearchResults>(searchResults));
            }
            catch (Exception e)
            {
                var wrapperException = new Exception($"Unexpected error occurred while executing {nameof(SearchManualTransactions)}", e);
                log.LogError(e, wrapperException.Message);
                return new ExceptionResult(wrapperException, true);
            }
        }

        private TransactionFilters ConvertToFilters(IQueryCollection query) => new TransactionFilters
        {
            SentBy = query["sentBy"],
            ReceivedBy = query["receivedBy"],
            SentSince = ConvertFromQueryString<DateTime>(query["sentSince"]),
            SentUntil = ConvertFromQueryString<DateTime>(query["sentUntil"])
        };

        private T? ConvertFromQueryString<T>(string queryStringValue) where T : struct
        {
            if (string.IsNullOrEmpty(queryStringValue))
                return null;

            try
            {
                var converter = TypeDescriptor.GetConverter(typeof(T));
                if (!(converter is null))
                    return (T) converter.ConvertFromString(queryStringValue);

                return null;
            }
            catch (NotSupportedException)
            {
                return null;
            }
        }
    }
}
