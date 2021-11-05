export class Account {
    id: number;
    nationId: number;
    nationName: string;
    rulerName: string;
    discord: string;
    discordUniqueId: number;
    uniqueCode: string;
    role: string;
    activity: number;
    strength: number;
    infra: number;
    tech: number;
    warStatus: number;
    hasForeignMinistry: boolean;
    hasFederalAidCommission: boolean;
    hasDisasterReliefAgency: boolean;
    slotsUsed: number;
    slotsFull: number;
    totalCashSent: number;
    totalCashReceived: number;
    totalTechSent: number;
    totalTechReceived: number;
    credit: number;
    cashSentTechCredit: number;
    cashReceivedTechCredit: number;
    cashSentCashCredit: number;
    cashReceivedCashCredit: number;
    techSentCashCredit: number;
    techReceivedCashCredit: number;
    techSentTechCredit: number;
    techReceivedTechCredit: number;
    previousListOrder: number;

    constructor(
        id: number = 0,
        nationId: number = 0,
        nationName: string = "",
        rulerName: string = "",
        discord: string = "",
        discordUniqueId: number = 0,
        uniqueCode: string = "",
        role: string = "",
        activity: number = 0,
        strength: number = 0,
        infra: number = 0,
        tech: number = 0,
        warStatus: number = 0,
        hasForeignMinistry: boolean = false,
        hasFederalAidCommission: boolean = false,
        hasDisasterReliefAgency: boolean = false,
        slotsUsed: number = 0,
        slotsFull: number = 0,
        totalCashSent: number = 0,
        totalCashReceived: number = 0,
        totalTechSent: number = 0,
        totalTechReceived: number = 0,
        credit: number = 0,
        cashSentTechCredit: number = 0,
        cashReceivedTechCredit: number = 0,
        cashSentCashCredit: number = 0,
        cashReceivedCashCredit: number = 0,
        techSentCashCredit: number = 0,
        techReceivedCashCredit: number = 0,
        techSentTechCredit: number = 0,
        techReceivedTechCredit: number = 0,
        previousListOrder: number = 0,
    ) {
        this.id = id;
        this.nationId = nationId;
        this.nationName = nationName;
        this.rulerName = rulerName;
        this.discord = discord;
        this.discordUniqueId = discordUniqueId;
        this.uniqueCode = uniqueCode;
        this.role = role;
        this.activity = activity;
        this.strength = strength;
        this.infra = infra;
        this.tech = tech;
        this.warStatus = warStatus;
        this.hasForeignMinistry = hasForeignMinistry;
        this.hasFederalAidCommission = hasFederalAidCommission;
        this.hasDisasterReliefAgency = hasDisasterReliefAgency;
        this.slotsUsed = slotsUsed;
        this.slotsFull = slotsFull;
        this.totalCashSent = totalCashSent;
        this.totalCashReceived = totalCashReceived;
        this.totalTechSent = totalTechSent;
        this.totalTechReceived = totalTechReceived;
        this.credit = credit;
        this.cashSentTechCredit = cashSentTechCredit;
        this.cashReceivedTechCredit = cashReceivedTechCredit;
        this.cashSentCashCredit = cashSentCashCredit;
        this.cashReceivedCashCredit = cashReceivedCashCredit;
        this.techSentCashCredit = techSentCashCredit;
        this.techReceivedCashCredit = techReceivedCashCredit;
        this.techSentTechCredit = techSentTechCredit;
        this.techReceivedTechCredit = techReceivedTechCredit;
        this.previousListOrder = previousListOrder;
    }
}