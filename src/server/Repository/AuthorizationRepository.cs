using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
using Repository.DTO;

namespace Repository
{
    public class AuthorizationRepository : IAuthorizationRepository
    {
        private readonly string _connectionString;

        public AuthorizationRepository(string connectionString) => _connectionString = connectionString;

        public async Task<AuthorizedUser> Authorize(int nationId, string uniqueCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string getAuthorizedUserQuery = @"
select nation_id as NationId, ruler_name as RulerName, psw as UniqueCode
from vep_db.account
join cybernations_db.nation on account.nation_id = nation.id
where nation_id = @nationId and psw = @uniqueCode";

            return await connection.QueryFirstOrDefaultAsync<AuthorizedUser>(getAuthorizedUserQuery, new { nationId, uniqueCode });
        }

        public async Task<AuthorizedUser> Authorize(string rulerName, string uniqueCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            const string getAuthorizedUserQuery = @"
select nation_id as NationId, ruler_name as RulerName, psw as UniqueCode
from vep_db.account
join cybernations_db.nation on account.nation_id = nation.id
where ruler_name = @rulerName and psw = @uniqueCode";

            return await connection.QueryFirstOrDefaultAsync<AuthorizedUser>(getAuthorizedUserQuery, new { rulerName, uniqueCode });
        }
    }
}