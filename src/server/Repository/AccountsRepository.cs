using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using MySqlConnector;
using Repository.DTO;

namespace Repository
{
    public class AccountsRepository : IAccountsRepository
    {
        private readonly string _connectionString;

        public AccountsRepository(string connectionString) => _connectionString = connectionString;

        public async Task<IEnumerable<AccountDetail>> GetAccountDetailsAsync()
        {
            const string query = @"
select 	account.id as Id,
        nation.id as NationId,
        nation.nation_name as NationName,
        nation.ruler_name as RulerName,
        account.discord as Discord,
        account.discord_id as DiscordUniqueId,
        account.psw as UniqueCode,
        account.va as Role,
		alliance.name as Alliance,
        nation.recent_activity as Activity,
        nation.strength as Strength,
        nation.infrastructure as Infra,
        nation.technology as Tech,
        nation.war_status as WarStatus,
        account.fm as HasForeignMinistry,
        account.fac as HasFederalAidCommission,
        account.dra as HasDisasterReliefAgency,
        coalesce(sent_aid_active.count, 0) + coalesce(recd_aid_active.count, 0) as SlotsUsed,
        4 + account.fm + account.fac as SlotsFull,
		coalesce(sent_aid.money, 0) div 1000000 as TotalCashSent,
        coalesce(recd_aid.money, 0) div 1000000 as TotalCashReceived,
        coalesce(sent_aid.technology, 0) as TotalTechSent,
        coalesce(recd_aid.technology, 0) as TotalTechReceived,
        balance.Credit,
        balance.Debt,
        balance.ctB as CashSentTechCredit,
        balance.ctS as CashReceivedTechCredit,
        balance.ccB as CashSentCashCredit,
        balance.ccS as CashReceivedCashCredit,
        balance.tcB as TechSentCashCredit,
        balance.tcS as TechReceivedCashCredit,
        balance.ttB as TechSentTechCredit,
        balance.ttS as TechReceivedTechCredit,
        999 as PreviousListOrder
from vep_db.account account
join vep_db.balance balance on account.nation_id = balance.nation_id
join cybernations_db.nation nation on account.nation_id = nation.id
join cybernations_db.alliance alliance on nation.alliance_id = alliance.id
left join (
	select sending_nation_id as nation_id, count(1) as `count`
    from cybernations_db.aid
    where date(`date`) > curdate() - interval 10 day
    group by sending_nation_id
) sent_aid_active on nation.id = sent_aid_active.nation_id
left join (
	select receiving_nation_id as nation_id, count(1) as `count`
    from cybernations_db.aid
    where date(`date`) > curdate() - interval 10 day
    group by receiving_nation_id
) recd_aid_active on nation.id = recd_aid_active.nation_id
left join (
	select sending_nation_id as nation_id, sum(money) as money, sum(technology) as technology
    from cybernations_db.aid
    group by sending_nation_id
) sent_aid on nation.id = sent_aid.nation_id
left join (
	select receiving_nation_id as nation_id, sum(money) as money, sum(technology) as technology
    from cybernations_db.aid
    group by receiving_nation_id
) recd_aid on nation.id = recd_aid.nation_id;";

            using var sqlConnection = new MySqlConnection(_connectionString);
            return await sqlConnection.QueryAsync<AccountDetail>(query);
        }
    }
}