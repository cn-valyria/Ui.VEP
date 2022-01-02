import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'transaction-aidbased-editor-dialog',
    templateUrl: './transaction-aidbased-edit.component.html'
})
export class AidBasedTransactionEditDialog {

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

    close(): void {
        this.isVisible = false;
    }
}