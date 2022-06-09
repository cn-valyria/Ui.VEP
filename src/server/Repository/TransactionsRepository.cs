using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
using Repository.DTO;

namespace Repository
{
    public class TransactionsRepository : ITransactionsRepository
    {
        private readonly string _connectionString;

        public TransactionsRepository(string connectionString) => _connectionString = connectionString;

        public async Task<DataCollection<TransactionDetail>> SearchTransactions(
            TransactionType transactionType,
            TransactionFilters filters,
            int limit,
            int offset
        )
        {
            using var sqlConnection = new MySqlConnection(_connectionString);

            await sqlConnection.ExecuteAsync("search_transactions", new 
            {
                _type = transactionType,
                _sent_by = filters.SentBy,
                _received_by = filters.ReceivedBy,
                _sent_since = filters.SentSince,
                _sent_until = filters.SentUntil
            }, commandType: CommandType.StoredProcedure);

            var totalCount = await sqlConnection.QueryFirstAsync<int>("select count(1) from tmpTxnSearchResults");
            var results = await sqlConnection.QueryAsync<TransactionDetail>(
                "select * from tmpTxnSearchResults order by AidId desc, StartsOn desc limit @offset, @limit",
                new { offset, limit });

            return new DataCollection<TransactionDetail>
            {
                TotalCount = totalCount,
                Results = results
            };
        }

        public async Task<TransactionSearchResponse> SearchTransactions(
            TransactionFilters filters,
            int limit,
            int offset)
        {
            using var sqlConnection = new MySqlConnection(_connectionString);

            await sqlConnection.ExecuteAsync("search_transactions", new 
            {
                _type = TransactionType.All,
                _sent_by = filters.SentBy,
                _received_by = filters.ReceivedBy,
                _sent_since = filters.SentSince,
                _sent_until = filters.SentUntil
            }, commandType: CommandType.StoredProcedure);

            var aidBasedCount = await sqlConnection.QueryFirstAsync<int>("select count(1) from tmpTxnSearchResults where AidId is not null");
            var aidBasedResults = await sqlConnection.QueryAsync<TransactionDetail>(
                "select * from tmpTxnSearchResults where AidId is not null order by AidId desc limit @offset, @limit",
                new { offset, limit });

            var manualCount = await sqlConnection.QueryFirstAsync<int>("select count(1) from tmpTxnSearchResults where AidId is null");
            var manualResults = await sqlConnection.QueryAsync<TransactionDetail>(
                "select * from tmpTxnSearchResults where AidId is null order by coalesce(SentByRulerName, ReceivedByRulerName) limit @offset, @limit",
                new { offset, limit });

            return new TransactionSearchResponse
            {
                AidBasedTransactions = (aidBasedCount, aidBasedResults),
                ManualTransactions = (manualCount, manualResults)
            };
        }
    }
}