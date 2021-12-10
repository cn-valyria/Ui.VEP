import { TransactionCode } from "./aidBasedTransaction";
import { AdjustmentType, AidStatus } from "./enums";
import { NationSimplified } from "./nationSimplified";
import { TransactionBase } from "./transactionBase";

export class ManualTransaction extends TransactionBase {
    nation: NationSimplified;
    adjustmentType: AdjustmentType;
    accountCode: string;

    constructor(
        id: number = 0,
        nation: NationSimplified = new NationSimplified(),
        adjustmentType: AdjustmentType = AdjustmentType.Credit,
        reason: string = "",
        accountCode: string = "",
        classification: number = 0,
        rate: number = 0,
        cashMovedTechCredit: number = 0,
        cashMovedCashCredit: number = 0,
        techMovedCashCredit: number = 0,
        techMovedTechCredit: number = 0
    ) {
        super(id, reason, classification, rate, cashMovedTechCredit, cashMovedCashCredit, techMovedCashCredit, techMovedTechCredit);
        
        this.nation = nation;
        this.adjustmentType = adjustmentType;
        this.accountCode = accountCode;
    }
}