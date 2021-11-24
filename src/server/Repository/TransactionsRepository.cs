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

        public async Task<(int ResultCount, IEnumerable<TransactionDetail> Results)> GetTransactionDetails(TransactionFilters filters, int limit, int offset)
        {
            using var sqlConnection = new MySqlConnection(_connectionString);

            await sqlConnection.ExecuteAsync("search_transactions", new 
            {
                _sent_by = filters.SentBy,
                _received_by = filters.ReceivedBy,
                _sent_since = filters.SentSince,
                _sent_until = filters.SentUntil
            }, commandType: CommandType.StoredProcedure);

            const string totalCountQuery = "select count(1) from tmpTxnSearchResults";
            var totalCount = await sqlConnection.QueryFirstAsync<int>(totalCountQuery);

            const string resultsQuery = "select * from tmpTxnSearchResults order by AidId desc limit @offset, @limit";
            var searchResults = await sqlConnection.QueryAsync<TransactionDetail>(resultsQuery, new { offset, limit });

            return (totalCount, searchResults);
        }
    }
}