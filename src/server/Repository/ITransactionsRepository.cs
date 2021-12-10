using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface ITransactionsRepository
    {
        Task<TransactionSearchResponse> SearchTransactions(
            TransactionFilters filters,
            int limit,
            int offset);
    }
}