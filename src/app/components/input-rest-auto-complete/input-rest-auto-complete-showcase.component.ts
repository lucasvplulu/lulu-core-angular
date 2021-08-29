import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as _moment from "moment";
import { Subject } from "rxjs";

const moment = _moment;

@Component({
    selector: "app-input-rest-auto-complete-showcase",
    templateUrl: "./input-rest-auto-complete-showcase.component.html",
})
export class InputRestAutoCompleteShowcaseComponent implements OnInit, OnDestroy {
    public financialGroup: FormGroup;
    private unsubscribe = new Subject();
    private dateFormat: string = "DD/MM/YYYY";

    constructor(private formBuilder: FormBuilder) {

    }

    public ngOnInit() {
        this.financialGroup = this.formBuilder.group({
            bank: this.formBuilder.control({value: null, disabled: false}),
            referenceDate: this.formBuilder.control({value: null, disabled: false}),
            dismissalReason: this.formBuilder.control({value: null, disabled: false}),
            wageType: this.formBuilder.control({value: null, disabled: false})
        });
    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

    public alert() {
        alert("entrou");
    }

    public get referenceDateValue(): string {
        const value = this.financialGroup.get("referenceDate").value;
        if (value) {
            const dateValue = moment(value, this.dateFormat);
            if (dateValue.isValid()) {
                return dateValue.format("YYYY-MM-DD");
            }
        }
        return null;
    }
}
