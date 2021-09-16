import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Account } from "src/app/models/account";

@Component({
    selector: 'account-editor-dialog',
    templateUrl: './account-edit-dialog.component.html'
})
export class AccountEditDialog {

    roles: string[] = [
        "Not Participating",
        "Buyer",
        "Seller",
        "Donor",
        "Farm",
        "Collector",
        "Receiver",
        "Probationary Seller",
        "Temp Donor",
        "Temp Farm",
        "Temp Collector",
        "Temp Receiver"
    ];

    private _account: Account | undefined;
    @Input()
    set account(val: Account | undefined) {
        this._account = val;
        if (val !== undefined) {
            this.accountForm.setValue({
                nationId: val.nationId,
                role: val.role,
                secretCode: val.secretCode,
                discord: {
                    id: val.discord ?? "",
                    discriminator: val.discordId
                },
                hasForeignMinistry: val.hasForeignMinistry,
                hasFederalAidCommission: val.hasFederalAidCommission,
                hasDisasterReliefAgency: val.hasDisasterReliefAgency
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
        role: new FormControl(''),
        secretCode: new FormControl(''),
        discord: new FormGroup({
            id: new FormControl(''),
            discriminator: new FormControl('')
        }),
        hasForeignMinistry: new FormControl(false),
        hasFederalAidCommission: new FormControl(false),
        hasDisasterReliefAgency: new FormControl(false)
    });

    onSubmit() {
        console.log(this.accountForm.value);
    }
}