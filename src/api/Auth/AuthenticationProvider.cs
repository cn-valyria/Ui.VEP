using System.Threading.Tasks;
using api.Contracts;
using Repository;
using Repository.DTO;

namespace api.Auth;

public class AuthenticationProvider : IAuthenticationProvider
{
    private readonly IAuthorizationRepository _authorizationRepository;
    
    public AuthenticationProvider(IAuthorizationRepository authorizationRepository)
    {
        _authorizationRepository = authorizationRepository;
    }

    public async Task<bool> IsAuthenticated(AuthorizeUserRequest account)
    {
        if (string.IsNullOrEmpty(account.UniqueCode))
            return false;
        if (string.IsNullOrEmpty(account.NationId) && string.IsNullOrEmpty(account.RulerName))
            return false;

        AuthorizedUser authorizedUser = null;
        if (!string.IsNullOrEmpty(account.NationId) && int.TryParse(account.NationId, out var nationId))
            authorizedUser = await _authorizationRepository.Authorize(nationId, account.UniqueCode);
        else
            authorizedUser = await _authorizationRepository.Authorize(account.RulerName, account.UniqueCode);

        return authorizedUser != null;
    }        
}

public interface IAuthenticationProvider
{
    Task<bool> IsAuthenticated(AuthorizeUserRequest account);
}