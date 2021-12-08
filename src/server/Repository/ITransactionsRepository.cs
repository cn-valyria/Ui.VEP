using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface ITransactionsRepository
    {
        Task<(int ResultCount, IEnumerable<TransactionDetail> Results)> SearchTransactions(
            TransactionType transactionType,
            TransactionFilters filters,
            int limit,
            int offset);
    }
}