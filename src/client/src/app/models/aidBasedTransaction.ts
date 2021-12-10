import { AidStatus } from "./enums";
import { NationSimplified } from "./nationSimplified";
import { TransactionBase } from "./transactionBase";

export class AidBasedTransaction extends TransactionBase {
    aidId: number;
    sentBy: NationSimplified | undefined;
    receivedBy: NationSimplified | undefined;
    status: AidStatus;
    money: number;
    technology: number;
    soldiers: number;
    startsOn: Date;
    code: TransactionCode;

    constructor(
        id: number = 0,
        aidId: number = 0,
        sentBy: NationSimplified | undefined,
        receivedBy: NationSimplified | undefined,
        status: AidStatus = AidStatus.Expired,
        money: number = 0,
        technology: number = 0,
        soldiers: number = 0,
        reason: string = "",
        startsOn: Date = new Date(),
        code: TransactionCode = new TransactionCode(),
        classification: number = 0,
        rate: number = 0,
        cashMovedTechCredit: number = 0,
        cashMovedCashCredit: number = 0,
        techMovedCashCredit: number = 0,
        techMovedTechCredit: number = 0
    ) {
        super(id, reason, classification, rate, cashMovedTechCredit, cashMovedCashCredit, techMovedCashCredit, techMovedTechCredit);
        this.aidId = aidId;
        this.sentBy = sentBy;
        this.receivedBy = receivedBy;
        this.status = status;
        this.money = money;
        this.technology = technology;
        this.soldiers = soldiers;
        this.startsOn = startsOn;
        this.code = code;
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