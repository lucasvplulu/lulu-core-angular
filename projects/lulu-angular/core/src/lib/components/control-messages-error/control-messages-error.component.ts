import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'control-messages-error',
    templateUrl: "./control-messages-error.component.html",
    styleUrls: ["./control-messages-error.component.css"],
})
export class ControlMessagesErrorComponent {
    @Input()
    control: FormControl;
    @Input()
    errorList: object;

    constructor() {}

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
                return this.errorList[propertyName];
            }
        }
        return null;
    }
}
