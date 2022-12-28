using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;
using Repository.DTO;

namespace Repository;

public class ListsRepository : IListsRepository
{
    private readonly string _connectionString;

    public ListsRepository(string connectionString) => _connectionString = connectionString;

    public async Task<List<AidListDetail>> GetAidListsAsync()
    {
        using var sqlConnection = new MySqlConnection(_connectionString);
        
        const string getAidListsQuery = @"
select  id as Id,
        subject as Subject,
        message as Message
from list";
        var lists = (await sqlConnection.QueryAsync<AidListDetail>(getAidListsQuery)).ToList();

        const string getListRecipientsQuery = @"
select  lr.list_id as ListId,
        a.nation_id as NationId,
        nation_name as NationName,
        ruler_name as RulerName,
        alliance.name as AllianceName,
        slots_full - slots_used as SlotsFree,
        Credit,
        Debt,
        recent_activity as RecentActivity,
        discord as Discord
from account a
join balance b on a.nation_id = b.nation_id
join aid_activity aa on a.id = aa.account_id
join cybernations_db.nation nation on a.nation_id = nation.id
join cybernations_db.alliance alliance on nation.alliance_id = alliance.id
join list_recipient lr on a.id = lr.account_id;";
        var recipients = await sqlConnection.QueryAsync<ListRecipientDetail>(getListRecipientsQuery);

        foreach (var list in lists)
            list.Recipients = recipients.Where(r => r.ListId == list.Id).ToList();

        return lists;
    }
}