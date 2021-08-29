import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as _moment from "moment";

const moment = _moment;

@Component({
    selector: "input-date-calendar-model",
    templateUrl: "./input-date-model.component.html",
})
export class InputDateModelComponent implements OnInit {
    @Input()
    name: string;
    @Input()
    disabled?: boolean;
    @Input()
    withoutDay: boolean;
    @Input()
    unmask: boolean;
    @Input()
    style: boolean;
    @Input()
    styleClass: string;

    @Output()
    onBlurGetMoment: EventEmitter<any> = new EventEmitter();
    @Output()
    modelChange: EventEmitter<any> = new EventEmitter();

    private _date: any;
    private locale: any;
    private format: any = "DD/MM/YYYY";
    private _model: any;
    mask = null;

    constructor() {
    }

    ngOnInit() {
        const newDate = this.model;
        const momentDate = moment(newDate, this.format || "YYYY-MM-DD");
        if (momentDate.isValid()) {
            this.model = momentDate.format(this.format || "L");
            this._date = momentDate;
        } else {
            this._date = null;
        }
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

    getFormat() {
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

    onBlur() {
        const dateComponet = this.model;
        this._date = moment(dateComponet, this.format);
        this.onBlurGetMoment.emit(this._date);
    }

    set model(val) {
        this._model = val;
        this.modelChange.emit(this._model);
    }

    @Input()
    get model() {
        return this._model;
    }
}
