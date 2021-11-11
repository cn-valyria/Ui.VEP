using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface IAccountsRepository
    {
        Task<IEnumerable<AccountDetail>> GetAccountDetailsAsync();

        Task UpdateAccountAsync(AccountToUpdate account);

        Task RemoveAccountAsync(int accountId);
    }
}