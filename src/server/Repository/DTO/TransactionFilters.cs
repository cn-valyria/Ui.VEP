using System;

namespace Repository.DTO
{
    public class TransactionFilters 
    {
        public string SentBy { get; set; }
        public string ReceivedBy { get; set; }
        public DateTime? SentSince { get; set; }
        public DateTime? SentUntil { get; set; }
    }
}