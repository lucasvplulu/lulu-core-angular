/**
 * Interface para ser usada na validação setValidatorsFields do arquivo helpers.
 */
import { ValidatorFn } from '@angular/forms';

export interface FieldValidatorsObject {
    field: string;
    validators: Array<ValidatorFn>;
    disabled?: boolean;
    clearValue?: boolean;
}
