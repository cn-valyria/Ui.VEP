using System.Collections.Generic;
using Models;

namespace Functions.Contracts
{
    public class TransactionSearchResults
    {
        public int TotalCount { get; set; }
        public IEnumerable<Transaction> Results { get; set; }
    }
}