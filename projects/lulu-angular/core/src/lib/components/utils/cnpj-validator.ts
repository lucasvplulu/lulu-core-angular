import { AbstractControl, Validators } from '@angular/forms';

export class CNPJValidator {

    /**
   * Valida se o CNPJ é valido. Deve-se ser informado o cnpj sem máscara.
   */
    checkCNPJ(value) {
        let cnpj = value;

        if (cnpj) {
            let size, numbers, digits, sum, pos, result;
            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj.length !== 14) {
                return true;
            }

            // Elimina CNPJs invalidos conhecidos
            if (
                cnpj === '00000000000000' ||
                cnpj === '11111111111111' ||
                cnpj === '22222222222222' ||
                cnpj === '33333333333333' ||
                cnpj === '44444444444444' ||
                cnpj === '55555555555555' ||
                cnpj === '66666666666666' ||
                cnpj === '77777777777777' ||
                cnpj === '88888888888888' ||
                cnpj === '99999999999999'
            ) {
                return false;
            }

            // Valida DVs
            size = cnpj.length - 2;
            numbers = cnpj.substring(0, size);
            digits = cnpj.substring(size);
            sum = 0;
            pos = size - 7;
            for (let i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result !== Number(digits.charAt(0))) {
                return false ;
            }

            size = size + 1;
            numbers = cnpj.substring(0, size);
            sum = 0;
            pos = size - 7;
            for (let i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2) {
                    pos = 9;
                }
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result !== Number(digits.charAt(1))) {
                return false;
            }

            return true;
        }
        return true;
    }
}

export const cnpjValidator = new CNPJValidator();
