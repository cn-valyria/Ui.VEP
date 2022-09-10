using System.Threading.Tasks;
using Repository.DTO;

namespace Repository
{
    public interface IAuthorizationRepository
    {
        Task<AuthorizedUser> Authorize(int nationId, string uniqueCode);
        Task<AuthorizedUser> Authorize(string rulerName, string uniqueCode);
    }
}