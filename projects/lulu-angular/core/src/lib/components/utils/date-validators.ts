import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import * as _moment from "moment";
import { unitOfTime } from "moment";
import { CompareType } from "../../core/enums";
import { DateCompareOptions, DateValidateOptions } from "../../core/interfaces";
import { removeCharacteresSpecials } from "./helpers";

const moment = _moment;

export class DateValidator {
    constructor() {
    }

    /**
     * Validador que verifica se a data está no formato correto.
     * @param dateFormat Formato da data
     * @param options Opções para validar a data
     * @returns Objeto no formato { invalidDate: true } indicando que a data não é válida
     */
    static isValidDate(dateFormat: string, options?: DateValidateOptions): ValidatorFn {
        const validator: ValidatorFn = (control: AbstractControl): Validators => {
            const value = removeCharacteresSpecials(control.value);
            dateFormat = removeCharacteresSpecials(dateFormat);
            if (value && dateFormat && value.length === dateFormat.length && !control.value.includes("_")) {
                const dateValue = moment(value, dateFormat);
                const valid = dateValue.isValid();
                return valid ? null : {invalidDate: true};
            }
            return null;
        };
        return validator;
    }

    /**
     * Validador que verifica se data inserida no formulário é inferior à data informada.
     * @param compareToDate Data a ser comparada.
     * @param dateFormat Informações do local
     * @param granularity Granularidade da comparação. Ex.: 'day', 'mounth', 'year'.
     * @returns Objeto no formato { lowerDate: true } indicando que a data é menor
     */
    static isDateLower(compareToDate: string, dateFormat: string, granularity: unitOfTime.StartOf = "day"): ValidatorFn {
        const options: DateCompareOptions = {compareName: "lowerDate", granularity: granularity};
        const validator = this.isValidDateCompare(compareToDate, dateFormat, CompareType.isBefore, options);
        return validator;
    }

    /**
     * Validador genérico usando comparação entre datas
     * @param compareToDate Data a ser comparada
     * @param dateFormat Informações do local
     * @param compareType Tipo de comparação
     * @param options Opções para a comparação
     * @returns Objeto no formato { nomeChave: true } indicando que a data não é válida
     */
    static isValidDateCompare(compareToDate: string, dateFormat: string, compareType: CompareType, options?: DateCompareOptions):
        ValidatorFn {
        const validator: ValidatorFn = (control: AbstractControl): Validators => {
            const value = removeCharacteresSpecials(control.value);
            dateFormat = removeCharacteresSpecials(dateFormat);
            if (value && dateFormat && value.length === dateFormat.length && !control.value.includes("_")) {
                const referenceDate = moment(value, dateFormat);
                const compareTo = moment(compareToDate, dateFormat);
                return this.dateCompare(referenceDate, compareTo, compareType, options);
            }
            return null;
        };
        return validator;
    }

    /**
     * Método auxiliar que realiza a comparação entre as datas e retorna um objeto caso a validação seja válida
     * @param referenceDate Data de referência para a comparação
     * @param compareToDate Data a ser comparada.
     * @param compareType Tipo de comparação.
     * @param options Opções para a comparação
     * @returns Objeto no formato { nomeChave: true } indicando que a data não é válida
     */
    private static dateCompare(referenceDate: any, compareToDate: any, compareType: CompareType, options?: DateCompareOptions):
        ValidationErrors {
        const compareTypeName: string = compareType === CompareType.isNotSame ? CompareType.isSame : compareType;
        const granularity = options && options.granularity ? options.granularity : "day";

        let comparison = referenceDate[compareTypeName](compareToDate, granularity);
        comparison = compareType === CompareType.isNotSame ? !comparison : comparison;
        if (comparison) {
            const keyName = options && options.compareName ? options.compareName : compareType;
            const result = {};
            result[keyName] = true;
            return result;
        }
        return null;
    }

}
