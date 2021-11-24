using System;

namespace Models
{
    public class TransactionCode
    {
        public char SendingRole { get; }
        public char ReceivingRole { get; }

        public TransactionCode(string code)
        {
            if (code.Length != 2)
                throw new ArgumentOutOfRangeException("Transaction code (aka lu) must be 2 characters");

            SendingRole = code[0];
            ReceivingRole = code[1];
        }
    }
}