import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { getNowDate } from "@lulu-sistemas/lulu-core-angular";
import { Subject } from "rxjs";
import { CompareType, DateValidator } from "projects/lulu-angular/core/src/public_api";

@Component({
    selector: "app-input-date-showcase",
    templateUrl: "./input-date-showcase.component.html",
})
export class InputDateShowcaseComponent implements OnInit, OnDestroy {
    formGroup: FormGroup;
    private unsubscribe = new Subject();
    private dateFormat: string;

    constructor(private formBuilder: FormBuilder) {
        this.createFormGroup();
    }

    private createFormGroup() {
        this.formGroup = this.formBuilder.group({
            dateOne: this.formBuilder.control({value: null, disabled: false},
                Validators.compose([
                    Validators.required,
                    DateValidator.isValidDate(this.dateFormat),
                    DateValidator.isValidDateCompare(this.compareToDate(), this.dateFormat, CompareType.isBefore)
                ])),
            dateTwo: this.formBuilder.control({value: null, disabled: true}),
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

    private compareToDate() {
        return getNowDate(this.dateFormat);
    }

}
