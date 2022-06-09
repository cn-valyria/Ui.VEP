using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface ITransactionsRepository
    {
        Task<DataCollection<TransactionDetail>> SearchTransactions(
            TransactionType transactionType,
            TransactionFilters filters,
            int limit,
            int offset
        );

        Task<TransactionSearchResponse> SearchTransactions(
            TransactionFilters filters,
            int limit,
            int offset);
    }
}