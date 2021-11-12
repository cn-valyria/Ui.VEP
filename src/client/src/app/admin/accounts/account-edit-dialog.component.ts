import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { Account } from "src/app/models/account";
import { AccountService } from "src/app/services/account.service";
import { VepAdminStore } from "src/app/store";

@Component({
    selector: 'account-editor-dialog',
    templateUrl: './account-edit-dialog.component.html'
})
export class AccountEditDialog implements OnInit, OnDestroy {

    private nationIdTextChangesUnsubscribe = new Subject();

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

    prospectSearchHadError: boolean = false;
    prospectSearchError: string = "";

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
        } else {
            this.accountForm.reset();
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
            discriminator: new FormControl(0)
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

    constructor(private store$: VepAdminStore, private accountService$: AccountService) { }

    ngOnInit(): void {
        this.accountForm.get("nationId")
            ?.valueChanges
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.nationIdTextChangesUnsubscribe)
            )
            .subscribe(nationId => {
                this.prospectSearchHadError = false;
                this.prospectSearchError = "";

                if (this.account === undefined && nationId !== undefined && nationId !== "" && !isNaN(parseInt(nationId))) {
                    this.accountService$.findProspect(nationId)
                        .then((prospect) => {
                            this.accountForm.patchValue({
                                nationName: prospect.nationName,
                                rulerName: prospect.rulerName
                            });
                        })
                        .catch((err: HttpErrorResponse) => {
                            console.error(err);
                            this.prospectSearchHadError = true;
                            this.prospectSearchError = err.error;
                            this.accountForm.patchValue({
                                nationName: "",
                                rulerName: ""
                            });
                        });
                }
            });
    }

    ngOnDestroy(): void {
      this.nationIdTextChangesUnsubscribe.next();
      this.nationIdTextChangesUnsubscribe.complete();
    }

    save() {
        console.log(this.accountForm.value);
        if (this.account === undefined) {
            return;
        }

        this.store$.dispatch("updateAccount", {
            id: this.account.id,
            role: this.accountForm.value.role,
            uniqueCode: this.accountForm.value.secretCode,
            discord: this.accountForm.value.discord.id,
            discordUniqueId: +this.accountForm.value.discord.discriminator,
            hasForeignMinistry: this.accountForm.value.hasForeignMinistry,
            hasFederalAidCommission: this.accountForm.value.hasFederalAidCommission,
            hasDisasterReliefAgency: this.accountForm.value.hasDisasterReliefAgency
        });
    }

    create() {
        console.log(this.accountForm.value);
        this.store$.dispatch("createAccount", parseInt(this.accountForm.get("nationId")?.value));
    }

    close(): void {
        this.account = undefined;
        this.isVisible = false;
    }
}