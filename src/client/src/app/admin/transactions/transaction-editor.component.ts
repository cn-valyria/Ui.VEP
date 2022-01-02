import { Component, EventEmitter, Input, Output } from "@angular/core";


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

    @Output()
    isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    close(): void {
        this.isVisible = false;
    }
}