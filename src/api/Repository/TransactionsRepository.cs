using System.Data;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
using Repository.DTO;

namespace Repository;

public class TransactionsRepository : ITransactionsRepository
{
    private readonly string _connectionString;

    public TransactionsRepository(string connectionString) => _connectionString = connectionString;

    public async Task<DataCollection<TransactionDetail>> SearchTransactionsAsync(
        TransactionType transactionType,
        TransactionFilters filters,
        int limit,
        int offset)
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

    public async Task<int> CreateTransactionAsync(TransactionCreateRequest transaction)
    {
        using var sqlConnection = new MySqlConnection(_connectionString);
        const string createTransactionQuery = @"
insert into transaction (
    aid_id,
    sending_nation_id,
    receiving_nation_id,
    reason_override,
    lu,
    co,
    rate,
    ct,
    cc,
    tc,
    tt
)
values (@aid_id, @sending_nation_id, @receiving_nation_id, @reason_override, @lu, @co, @rate, @ct, @cc, @tc, @tt)";
        
        await sqlConnection.ExecuteAsync(createTransactionQuery, new
        {
            aid_id = transaction.AidId,
            sending_nation_id = transaction.SendingNationId,
            receiving_nation_id = transaction.ReceivingNationId,
            reason_override = transaction.ReasonOverride,
            lu = transaction.Lu,
            co = transaction.Classification,
            rate = transaction.Rate,
            ct = transaction.CashMovedTechCredit,
            cc = transaction.CashMovedCashCredit,
            tc = transaction.TechMovedCashCredit,
            tt = transaction.TechMovedTechCredit
        });

        const string getTransactionIdQuery = @"
select id 
from transaction
where (aid_id is null and @aid_id is null or aid_id = @aid_id)
and (sending_nation_id is null and @sending_nation_id is null or sending_nation_id = @sending_nation_id)
and (receiving_nation_id is null and @receiving_nation_id is null or receiving_nation_id = @receiving_nation_id)";

        return await sqlConnection.QueryFirstAsync<int>(getTransactionIdQuery, new
        {
            aid_id = transaction.AidId,
            sending_nation_id = transaction.SendingNationId,
            receiving_nation_id = transaction.ReceivingNationId,
        });
    }
}