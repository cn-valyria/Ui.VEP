import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Account } from "src/app/models/account";

@Component({
    selector: 'account-editor-dialog',
    templateUrl: './account-edit-dialog.component.html'
})
export class AccountEditDialog {

    roles: string[] = [
        "H",
        "B",
        "S",
        "D",
        "F",
        "C",
        "R",
        "N",
        "P",
        "V",
        "Q",
        "W"
    ];

    private _account: Account | undefined;
    @Input()
    set account(val: Account | undefined) {
        this._account = val;
        if (val !== undefined) {
            this.accountForm.setValue({
                nationId: val.nationId,
                nationName: val.nationName,
                rulerName: val.rulerName,
                role: val.role,
                secretCode: val.uniqueCode,
                discord: {
                    id: val.discord || "",
                    discriminator: val.discordUniqueId
                },
                hasForeignMinistry: val.hasForeignMinistry,
                hasFederalAidCommission: val.hasFederalAidCommission,
                hasDisasterReliefAgency: val.hasDisasterReliefAgency,
                slotsFree: val.slotsFull - val.slotsUsed,
                slotsFull: val.slotsFull,
                balance: {
                    credit: val.credit,
                    debt: 0, //val.debt,
                    balance: 0, //val.balance
                },
                cashSentTechCredit: val.cashSentTechCredit,
                cashReceivedTechCredit: val.cashReceivedTechCredit,
                cashSentCashCredit: val.cashSentCashCredit,
                cashReceivedCashCredit: val.cashReceivedCashCredit,
                techSentCashCredit: val.techSentCashCredit,
                techReceivedCashCredit: val.techReceivedCashCredit,
                techSentTechCredit: val.techSentTechCredit,
                techReceivedTechCredit: val.techReceivedTechCredit,
                previousListOrder: val.previousListOrder
            });
        }
    }
    get account(): Account | undefined {
        return this._account;
    }

    private _isVisible: boolean = false;
    @Input()
    set isVisible(val: boolean) {
        this.isVisibleChange.emit(val);
        this._isVisible = val;
    }
    get isVisible(): boolean {
        return this._isVisible;
    }

    @Output()
    isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    accountForm = new FormGroup({
        nationId: new FormControl(''),
        nationName: new FormControl(''),
        rulerName: new FormControl(''),
        role: new FormControl(''),
        secretCode: new FormControl(''),
        discord: new FormGroup({
            id: new FormControl(''),
            discriminator: new FormControl('')
        }),
        hasForeignMinistry: new FormControl(false),
        hasFederalAidCommission: new FormControl(false),
        hasDisasterReliefAgency: new FormControl(false),
        slotsFree: new FormControl(0),
        slotsFull: new FormControl(0),
        balance: new FormGroup({
            credit: new FormControl(0),
            debt: new FormControl(0),
            balance: new FormControl(0)
        }),
        cashSentTechCredit: new FormControl(0),
        cashReceivedTechCredit: new FormControl(0),
        cashSentCashCredit: new FormControl(0),
        cashReceivedCashCredit: new FormControl(0),
        techSentCashCredit: new FormControl(0),
        techReceivedCashCredit: new FormControl(0),
        techSentTechCredit: new FormControl(0),
        techReceivedTechCredit: new FormControl(0),
        previousListOrder: new FormControl(0)
    });

    onSubmit() {
        console.log(this.accountForm.value);
    }
}