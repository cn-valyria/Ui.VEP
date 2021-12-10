/*
 * UI-related enums
 */

export enum TransactionType {
    AidBased,
    Manual
}

export enum AdjustmentType {
    Credit,
    Debt
}

/*
 * Data-related enums
 */

export enum AidStatus {
    Pending = 1,
    Approved,
    Cancled, // Yes this is intentionally misspelled; admin is dumb and can't spell apparently
    Expired
}