import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AidBasedTransaction } from "src/app/models/aidBasedTransaction";
import { AidStatus } from "src/app/models/enums";

@Component({
    selector: 'transaction-editor-dialog',
    templateUrl: './transaction-editor.component.html'
})
export class TransactionEditorDialog {

    private _isVisible: boolean = false;
    @Input()
    set isVisible(val: boolean) {
        this.isVisibleChange.emit(val);
        this._isVisible = val;
    }
    get isVisible(): boolean {
        return this._isVisible;
    }

    private _aidBasedTransaction: AidBasedTransaction | undefined;
    @Input()
    get aidBasedTransaction(): AidBasedTransaction | undefined {
        return this._aidBasedTransaction;
    }
    set aidBasedTransaction(val: AidBasedTransaction | undefined) {
        this._aidBasedTransaction = val;
        this.transactionForm.reset();
        if (val !== undefined) {
            this.transactionForm.patchValue({
                id: val.id,
                reason: val.reason,
                classification: val.classification,
                rate: val.rate,
                cashMovedTechCredit: val.cashMovedTechCredit,
                cashMovedCashCredit: val.cashMovedCashCredit,
                techMovedCashCredit: val.techMovedCashCredit,
                techMovedTechCredit: val.techMovedTechCredit,
                aidBasedData: {
                    aidId: val.aidId,
                    sentBy: {
                        nationName: val.sentBy?.nationName,
                        rulerName: val.sentBy?.rulerName
                    },
                    receivedBy: {
                        nationName: val.receivedBy?.nationName,
                        rulerName: val.receivedBy?.rulerName
                    },
                    status: val.status,
                    money: val.money,
                    technology: val.technology,
                    soldiers: val.soldiers,
                    startsOn: val.startsOn,
                    code: val.code
                }
            });
        } else {
            this.aidBasedTransactionChange.emit(val);
        }
    }

    @Output()
    isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output()
    aidBasedTransactionChange: EventEmitter<AidBasedTransaction | undefined> = new EventEmitter<AidBasedTransaction | undefined>();

    get aidStatusNames(): typeof AidStatus {
        return AidStatus;
    }

    transactionForm = new FormGroup({
        id: new FormControl(0),
        reason: new FormControl(''),
        classification: new FormControl(0),
        rate: new FormControl(0),
        cashMovedTechCredit: new FormControl(0),
        cashMovedCashCredit: new FormControl(0),
        techMovedCashCredit: new FormControl(0),
        techMovedTechCredit: new FormControl(0),
        aidBasedData: new FormGroup({
            aidId: new FormControl(0),
            sentBy: new FormGroup({
                nationName: new FormControl(''),
                rulerName: new FormControl('')
            }),
            receivedBy: new FormGroup({
                nationName: new FormControl(''),
                rulerName: new FormControl('')
            }),
            status: new FormControl(''),
            money: new FormControl(0),
            technology: new FormControl(0),
            soldiers: new FormControl(0),
            startsOn: new FormControl(new Date()),
            code: new FormControl('')
        }),
        manualData: new FormGroup({
            nation: new FormGroup({
                nationName: new FormControl(''),
                rulerName: new FormControl('')
            }),
            adjustmentType: new FormControl(0),
            accountCode: new FormControl('')
        })
    });

    save(): void {
        console.log(this.transactionForm.value);
    }

    close(): void {
        this.aidBasedTransaction = undefined;
        this.isVisible = false;
    }

    toAidStatusValue(status: string): AidStatus {
        return AidStatus[status as keyof typeof AidStatus];
    }
}