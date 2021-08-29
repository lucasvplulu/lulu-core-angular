import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidatorFn } from "@angular/forms/";
import * as chance from "chance";
import * as momentImported from "moment";
import business from "moment-business";
import { FieldValidatorsObject } from "../../core/interfaces/field-validators-object";

const moment = momentImported;

export function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
}

export function isShallow(item) {
    return Array.isArray(item) && item.find(value => typeof value === "object") ? false : true;
}

export function convertBooleanString(value) {
    if (typeof value === "boolean") {
        return value === true ? "true" : "false";
    }
    return value;
}

export function convertStringToBoolean(value) {
    return value === true || value.toLowerCase() === "true";
}

export function assign(target, ...sources) {
    if (!sources.length) {
        return target;
    }

    const source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {[key]: {}});
                }
                assign(target[key], source[key]);
            } else {
                if (isShallow(source[key])) {
                    Object.assign(target, {[key]: source[key]});
                } else {
                    if (!target[key]) {
                        Object.assign(target, {[key]: []});
                    }
                    Object.assign(target, {[key]: source[key].map((item, index) => assign(target[key][index] || {}, item))});
                }
            }
        }
    }
    return assign(target, ...sources);
}

export function isValid(value) {
    return value === 0 || typeof value === "boolean" ? true : value !== undefined && value !== null && value !== "";
}

export function isValidDate(value, withDays = true) {
    if (value && isFullDate(value, withDays)) {
        if (withDays) {
            return moment(value.replace(/[^\d]+/g, ""), "DDMMYYYY").isValid();
        } else {
            return moment(value.replace(/[^\d]+/g, ""), "MMYYYY").isValid();
        }
    }
    return true;
}

export function isFullDate(value, withDays = true) {
    if (value) {
        let totalLength;
        if (withDays) {
            totalLength = 8;
        } else {
            totalLength = 6;
        }
        return value.replace(/[^\d]+/g, "").length === totalLength;
    }
    return true;
}

export function autoCompleteObjectForIdObject(tableIdObject) {
    if (!isObject(tableIdObject)) {
        console.error("Paramentro não é um objeto");
        return false;
    }

    if (tableIdObject.hasOwnProperty("tableId")) {
        console.error("Paramentro não é um objeto Auto Complete válido, falta tableId");
    }

    if (!isValid(tableIdObject.tableId)) {
        console.error("tableId esta vazio");
    }

    return {id: tableIdObject.tableId};
}

export function isDateField(name, value) {
    const testDate = name.search("Date");
    if (testDate !== -1) {
        return invertFieldDate(value);
    }
    return value;
}

export function invertFieldDate(value, inFormat = "DDMMYYYY", outFormat = "YYYY-MM-DD") {
    if (!isValid(value)) {
        return;
    }
    const formatIn = getFormatDate(value, inFormat);
    return moment(value.replace(/[^\d]+/g, ""), formatIn).format(outFormat);
}

export function getAddWeekDaysBusiness(value, quantidade) {
    return business.addWeekDays(getMoment(value), quantidade).format("DD/MM/YYYY");
}

export function getWeekDaysBusiness(startDate, endDate) {
    const endMoment = endDate ? getMoment(endDate) : getMoment(startDate).endOf("month");
    return business.weekDays(getMoment(startDate), endMoment);
}

export function getFormatDate(value, inFormat) {
    if (value.search("/") !== -1) {
        return "DDMMYYYY";
    } else if (value.search("-") !== -1) {
        return "YYYYMMDD";
    }
    return inFormat;
}

/**
 * FIXME - Está fixo para uso do calendário portugues Brasil
 * @param value
 * @param outFormat
 * @returns
 */
export function ngCalendarFormat(value, outFormat = "DD/MM/YYYY") {
    if (isValidDate(value)) {
        if (typeof value === "string") {
            return value;
        } else {
            return _moment(value).format(outFormat);
        }
    }
}

export function getNowDate(outFormat = "YYYY-MM-DD") {
    return moment().format(outFormat);
}

export function getMoment(value, inFormat = "DDMMYYYY") {
    const formatIn = getFormatDate(value, inFormat);
    return moment(value.replace(/[^\d]+/g, ""), formatIn);
}

export function _moment(value, format?: string) {
    if (format) {
        return moment(value, format);
    }
    return moment(value);
}

export function getObjValids(objs) {
    const json = Object.assign({}, objs);
    const jsonReturn = {};
    Object.keys(json).map(key => {
        if (isValid(json[key])) {
            jsonReturn[key] = isDateField(key, json[key]);
        }
    });
    return jsonReturn;
}

export function removeEmpty(obj) {
    Object.keys(obj).forEach(
        k => (obj[k] && typeof obj[k] === "object" && removeEmpty(obj[k])) || (!obj[k] && obj[k] !== undefined && delete obj[k])
    );
    return obj;
}

export function formatMoney(value, i18n = "EN") {
    switch (i18n) {
        case "EN":
            return isValid(value)
                ? value
                    .toString()
                    .replace(".", "")
                    .replace(",", ".")
                : "";
        case "BR":
            return isValid(value)
                ? value
                    .toString()
                    .replace(".", ",")
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                : "";
        default:
            return isValid(value)
                ? value
                    .toString()
                    .replace(".", "")
                    .replace(",", ".")
                : "";
    }
}

export function uiid() {
    return new chance()
        .guid()
        .replace(/[^a-zA-Z0-9.]/g, "")
        .toUpperCase();
}

export function mountCustomForSave(custom, customEntity = null, locale = null) {
    const custonField = [];
    if (customEntity && custom.length) {
        customEntity.map((val, key) => {
            const field = Object.keys(custom[key]).toString();
            const valOrnull = isValid(custom[key][field]) ? custom[key][field] : null;
            const value =
                val.type === "date" && locale && isValid(valOrnull) ? moment(valOrnull, getFormat(locale)).format("YYYY-MM-DD") : valOrnull;
            custonField.push({
                field: field,
                value: value,
            });
        });
    }
    return custonField.length ? custonField : null;
}

/**
 * Prepara o objeto de campos customizados para salvar as entidades que
 * são utilizadas a partir do CRUD customizado.
 * @param objectFields objeto com os campos customizados da entidade.
 */
export function mountCustomToSave(objectFields) {
    const customFields = [];
    Object.entries(objectFields).forEach(([ field, value ]) => {
        customFields.push({
            field: field,
            value: value,
        });
    });
    return customFields;
}

/**
 * Prepara o objeto de campos customizados para exibir as entidades que
 * são utilizadas a partir do CRUD customizado.
 * @param customFields objeto com os campos customizados da entidade.
 */
export function mountCustomToShow(customFields) {
    const customFieldsToShow = {};
    if (customFields && customFields.length) {
        customFields.forEach(item => {
            if (item.type === "date" && item.value) {
                item.value = _moment(item.value).format("L");
            }
            customFieldsToShow[item.field] = item.value;
        });
    }
    return customFieldsToShow;
}

/**
 * Prepara o objeto de campos customizados para salvar as entidades que
 * são utilizadas a partir do CRUD gerado.
 * @param objectFields objeto com os campos customizados da entidade.
 */
export function mountGeneratedCustomToSave(objectFields) {
    Object.entries(objectFields).forEach(([ key, value ]) => {
        if (!value) {
            delete objectFields[key];
        }
    });
    return objectFields;
}

export function mountCustomForShow(custom) {
    const customField = [];
    Object.keys(custom || {}).forEach(val => {
        if (custom[val].type === "date" && custom[val].value) {
            custom[val].value = _moment(custom[val].value).format("L");
        }
        customField.push(custom[val]);
    });
    return customField;
}

export function setValueCustom(custonFields, custom) {
    const isCustons = custom ? Object.keys(custom).length : 0;
    custonFields.map(val => {
        val.value = isCustons > 0 ? custom[val.field] : null;
    });
    return custonFields;
}

/**
 *  Adiciona um erro no controle do formulário. Deve ser chamado com .call passando o contexto da class.
 *  Ex.: setErrors.call(this.contractGroup, 'registerEmployeeNumber', 'exist', !payload)
 *
 * @param formControlName Nome do controle do formulário.
 * @param keyError Nome do error a ser exibido em tela.
 * @param isInvalid Se houver algum erro de validação no campo.
 */
export function setErrors(formControlName: string, keyError: string, isInvalid: boolean): void {
    setTimeout(() => {
        if (isInvalid) {
            const errors = Object.assign({}, this.get(formControlName).errors);
            errors[keyError] = isInvalid;
            this.get(formControlName).setErrors(errors);
        } else {
            const errors = this.get(formControlName).errors;

            if (errors && Object.keys(errors).length) {
                delete errors[keyError];

                if (!Object.keys(errors).length) {
                    this.get(formControlName).setErrors(null);
                }
            }
        }
    }, 0);
}

/**
 * Faz loop do nos controls do formulário e subArray caso existir
 * setando os inválidos
 * Ex.: verifyValidationsForm.call(this.initialGroup);
 */
export function verifyValidationsForm() {
    Object.keys(this.controls).map(field => {
        const control = this.get(field);
        control.markAsDirty();
        if (control instanceof FormGroup || control instanceof FormArray) {
            verifyValidationsForm.call(control);
        }
    });
}

/**
 * Retorna a idade de acordo com a data de nascimento.
 *
 * @param birthdayDate Data de nascimento.
 */
export function getYears(birthday) {
    const currentDate = moment();
    const years = currentDate.diff(birthday, "years", false);
    return years;
}

export function setCustonFields(customFields) {
    customFields.map(val => {
        const addCuston = {};
        let value = val.value || null;
        if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        addCuston[val.field] = new FormControl(value);
        this.push(new FormGroup(addCuston));
    });
    return customFields;
}

export function setRequired(formGroup: FormGroup, name: string, required: boolean, validators?: ValidatorFn[]) {
    if (required) {
        formGroup.controls[name].setValidators(Validators.compose(validators && validators.length ? validators : [ Validators.required ]));
        formGroup.controls[name].updateValueAndValidity();
    } else {
        formGroup.controls[name].setValidators(null);
        formGroup.controls[name].updateValueAndValidity();
    }
}

/**
 * Esse método tem como função setar os campos enable ou disable.
 * @param formGroup FormGroup onde se encontra os campos a serem alterados.
 * @param condition Condição para validação. True = enabled, False = disabled.
 * @param fields Campos a serem manipulados.
 * @param fieldsToClear Campos a serem limpos. É opicional e se não foi passado o método limpará os mesmos campos dos fields.
 */
export function configEnabledFields(formGroup: FormGroup, condition: boolean, fields: Array<string>, fieldsToClear?: Array<string>) {
    if (condition) {
        fields.forEach(field => formGroup.get(field).enable());
    } else {
        fields.forEach(field => formGroup.get(field).disable());
        clearValues(formGroup, fieldsToClear ? fieldsToClear : fields);
    }
}

/**
 * Esse método tem como função setar os campos como requeridos ou não.
 *
 * @param formGroup FormGroup onde se encontra os campos a serem alterados.
 * @param condition Se será ou não requeridos.
 * @param fields Lista de campos.
 */
export function setRequiredFields(formGroup: FormGroup, condition: boolean, fields: Array<string>) {
    if (condition) {
        fields.forEach(field => setRequired(formGroup, field, true, [ Validators.required ]));
    } else {
        fields.forEach(field => setRequired(formGroup, field, false));
    }
}


/**
 * Esse método tem como função setar validações dinâmicas nos campos.
 *
 * @param formGroup FormGroup onde se encontra os campos a serem alterados.
 * @param fields Lista de objetos [{field: campo, validators: validações, disable: boolean}].
 */
export function setValidatorsAndDisableFields(formGroup: FormGroup, fields: Array<FieldValidatorsObject>) {
    fields.forEach((currentField: FieldValidatorsObject) => {
        setValidator(formGroup, currentField.field, currentField.validators);
        setDisableField(formGroup, currentField.disabled, currentField.field, currentField.clearValue);
    });
}


export function setValidator(formGroup: FormGroup, name: string, validators?: ValidatorFn[]) {
    if (validators && validators.length) {
        formGroup.controls[name].setValidators(Validators.compose(validators));
        formGroup.controls[name].updateValueAndValidity();
    } else {
        formGroup.controls[name].setValidators(null);
        formGroup.controls[name].updateValueAndValidity();
    }
}


/**
 * Esse método tem como função setar os campos enable ou disable.
 * @param formGroup FormGroup onde se encontra os campos a serem alterados.
 * @param condition Condição para validação. True = disabled, False = enabled.
 * @param field Campo a ser manipulados.
 * @param clearValue Campos a ser limpos. É opicional e se não foi passado o método limpará o campo do field.
 */
export function setDisableField(formGroup: FormGroup, condition: boolean, field: string, clearValue: boolean = true) {
    if (condition) {
        formGroup.get(field).disable();
        if (clearValue) formGroup.get(field).reset();
    } else {
        formGroup.get(field).enable();
    }
}

/**
 * Ordena array de objetos
 * @param key o campo que deseja ordenar
 * @param order a ordem que deseja ordenar o campo
 */
export function compareValues(key: string, order: string = "ASC") {
    return function innerSort(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === "string")
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === "string")
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === "DESC") ? (comparison * -1) : comparison
        );
    };
}

/**
 * Esse método tem como função limpar o valor dos campos.
 *
 * @param formGroup FormGroup onde se encontra os campos a serem limpos.
 * @param fields Campos a serem limpos.
 */
export function clearValues(formGroup: FormGroup, fields: Array<string>) {
    fields.forEach(field => formGroup.get(field).reset());
}

/**
 *
 * @param qs = window.location.search
 * @returns Object com parametros query string
 */
export function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    const params = {};
    let tokens;
    const re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

export function getFormat(locale) {
    if (locale) {
        let dateFormat = locale.calendar.dateFormat.toString();
        dateFormat = dateFormat.replace(/[y]/g, "YY");
        dateFormat = dateFormat.replace(/[/]/g, "");
        return dateFormat.toUpperCase();
    }
}

/**
 * Remove os caracteres que não sejam números do valor
 * @param value valor a ser tratado
 * @returns string O valor sem caracteres especiais
 */
export function removeCharacteresSpecials(value: any): string {
    return value ? value.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "") : null;
}
