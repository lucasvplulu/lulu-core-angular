import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as _moment from "moment";
import { Subject } from "rxjs";

const moment = _moment;

@Component({
    selector: "l-input-date-calendar",
    templateUrl: "./input-date.component.html",
})
export class InputDateComponent implements OnInit, OnDestroy {
    @ViewChild("inputDateElement", {static: false})
    _inputDateElement: ElementRef;
    @Input()
    form: FormGroup;
    @Input()
    name: string;
    @Input()
    disabled?: boolean;
    @Input()
    unmask = true;
    @Input()
    inputId: string;
    @Input()
    withoutDay: boolean;
    @Input()
    readonly: boolean;

    @Output()
    onBlurGetMoment: EventEmitter<any> = new EventEmitter();

    private ngUnsubscribe = new Subject();
    private _date: any;
    private locale: any;
    private format: any;
    mask = null;

    constructor() {
    }

    ngOnInit() {
        const newDate = this.form &&  this.form.get(this.name) && this.form.get(this.name).value && this.form.get(this.name).value.toString();
        const momentDate = moment(newDate, this.format || "YYYY-MM-DD");
        this.form.get(this.name).setValue(momentDate.format(this.format || "L"));
        this._date = momentDate;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    formatMask(loc) {
        this.locale = loc;
        let dateMask = this.locale.calendar.dateFormat.toString();

        if (this.withoutDay) {
            dateMask = dateMask.replace("dd/", "").replace("-dd", "");
        }

        dateMask = dateMask.replace(/[d]|[m]/g, "9");
        return dateMask.replace(/[y]/g, "99");
    }

    setFormat() {
        let dateFormat = this.locale.calendar.dateFormat.toString();
        dateFormat = dateFormat.replace(/[y]/g, "YY");

        if (this.withoutDay) {
            dateFormat = dateFormat.replace("dd/", "").replace("-dd", "");
        }

        return dateFormat.toUpperCase();
    }

    get placeholder() {
        return this.mask ? this.mask.toString().replace(/[9]/g, "_") : "";
    }

    onBlur(event) {
        if (event && event.target && event.target.value) {
            const dateComponent = this.form.get(this.name).value;
            this._date = moment(dateComponent, this.format);
            this.onBlurGetMoment.emit(this._date);
        } else {
            this._date = {};
            this.form.get(this.name).setValue(null);
            this.onBlurGetMoment.emit(null);
        }
    }

    @Input()
    get model() {
        const dateComponet = this.form.get(this.name).value;
        return moment(dateComponet, this.format);
    }

    get inputDateElement() {
        return this._inputDateElement;
    }
}
