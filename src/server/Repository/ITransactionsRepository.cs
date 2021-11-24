using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface ITransactionsRepository
    {
        Task<(int ResultCount, IEnumerable<TransactionDetail> Results)> GetTransactionDetails(TransactionFilters filters, int limit, int offset);
    }
}