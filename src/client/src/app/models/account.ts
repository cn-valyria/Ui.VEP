export class Account {
    nationId: number;
    rulerName: string;
    nationName: string;
    discord?: string;
    discordId: number;
    secretCode: string;
    role: string;
    hasForeignMinistry: boolean;
    hasFederalAidCommission: boolean;
    hasDisasterReliefAgency: boolean;

    constructor(nationId = 0, rulerName = "", nationName = "", discord = "", discordId = 0, 
        secretCode = "", role = "", hasForeignMinistry = false, hasFederalAidCommission = false, 
        hasDisasterReliefAgency = false)
    {
        this.nationId = nationId;
        this.rulerName = rulerName;
        this.nationName = nationName;
        this.discord = discord;
        this.discordId = discordId;
        this.secretCode = secretCode;
        this.role = role;
        this.hasForeignMinistry = hasForeignMinistry;
        this.hasFederalAidCommission = hasFederalAidCommission;
        this.hasDisasterReliefAgency = hasDisasterReliefAgency;
    }
}