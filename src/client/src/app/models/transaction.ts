import { NationSimplified } from "./nationSimplified";

export class Transaction {
    id: number;
    aidId: number | undefined;
    sentBy: NationSimplified | undefined;
    receivedBy: NationSimplified | undefined;
    status: number;
    money: number;
    technology: number;
    soldiers: number;
    reason: string;
    startsOn: Date;
    code: TransactionCode | undefined;
    classification: number;
    rate: number;
    cashMovedTechCredit: number;
    cashMovedCashCredit: number;
    techMovedCashCredit: number;
    techMovedTechCredit: number;

    constructor(
        id: number = 0,
        aidId: number | undefined = undefined,
        sentBy: NationSimplified | undefined = undefined,
        receivedBy: NationSimplified | undefined = undefined,
        status: number = 0,
        money: number = 0,
        technology: number = 0,
        soldiers: number = 0,
        reason: string = "",
        startsOn: Date = new Date(),
        code: TransactionCode | undefined = undefined,
        classification: number = 0,
        rate: number = 0,
        cashMovedTechCredit: number = 0,
        cashMovedCashCredit: number = 0,
        techMovedCashCredit: number = 0,
        techMovedTechCredit: number = 0
    ) {
        this.id = id;
        this.aidId = aidId;
        this.sentBy = sentBy;
        this.receivedBy = receivedBy;
        this.status = status;
        this.money = money;
        this.technology = technology;
        this.soldiers = soldiers;
        this.reason = reason;
        this.startsOn = startsOn;
        this.code = code;
        this.classification = classification;
        this.rate = rate;
        this.cashMovedTechCredit = cashMovedTechCredit;
        this.cashMovedCashCredit = cashMovedCashCredit;
        this.techMovedCashCredit = techMovedCashCredit;
        this.techMovedTechCredit = techMovedTechCredit;
    }
}

export class TransactionCode {
    sendingRole: string;
    receivingRole: string;

    constructor(sendingRole: string = "", receivingRole: string = "") {
        this.sendingRole = sendingRole;
        this.receivingRole = receivingRole;
    }
}