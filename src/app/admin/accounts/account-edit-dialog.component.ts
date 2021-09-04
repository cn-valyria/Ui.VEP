import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Account } from "src/app/models/account";

@Component({
    selector: 'account-editor-dialog',
    templateUrl: './account-edit-dialog.component.html'
})
export class AccountEditDialog {
    @Input() account: Account | undefined;

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
}