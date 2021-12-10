export abstract class TransactionBase {
    id: number;
    reason: string;
    classification: number;
    rate: number;
    cashMovedTechCredit: number;
    cashMovedCashCredit: number;
    techMovedCashCredit: number;
    techMovedTechCredit: number;

    constructor(
        id: number = 0,
        reason: string = "",
        classification: number = 0,
        rate: number = 0,
        cashMovedTechCredit: number = 0,
        cashMovedCashCredit: number = 0,
        techMovedCashCredit: number = 0,
        techMovedTechCredit: number = 0
    ) {
        this.id = id;
        this.reason = reason;
        this.classification = classification;
        this.rate = rate;
        this.cashMovedTechCredit = cashMovedTechCredit;
        this.cashMovedCashCredit = cashMovedCashCredit;
        this.techMovedCashCredit = techMovedCashCredit;
        this.techMovedTechCredit = techMovedTechCredit;
    }
}