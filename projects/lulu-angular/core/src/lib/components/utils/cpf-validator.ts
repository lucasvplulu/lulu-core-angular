import { AbstractControl, Validators } from '@angular/forms';

/**
 * Created by Bruno.Curioletti on 30/05/2017.
 */
export class CPFValidator {
    calcChecker1(firstNineDigits) {
        let sum = null;

        for (let j = 0; j < 9; ++j) {
            sum += firstNineDigits.toString().charAt(j) * (10 - j);
        }

        const lastSumChecker1 = sum % 11;
        const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;

        return checker1;
    }

    calcChecker2(cpfWithChecker1) {
        let sum = null;

        for (let k = 0; k < 10; ++k) {
            sum += cpfWithChecker1.toString().charAt(k) * (11 - k);
        }

        const lastSumChecker2 = sum % 11;
        const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

        return checker2;
    }

    checkCPF(value) {
        const cleanCPF = value.replace(/\.|\-|\s/g, ''),
            firstNineDigits = cleanCPF.substring(0, 9),
            checker = cleanCPF.substring(9, 11);

        if (cleanCPF.length !== 11) {
            return false;
        }

        // Checking if all digits are equal
        for (let i = 0; i < 10; i++) {
            if ('' + firstNineDigits + checker === Array(12).join(i.toString())) {
                return false;
            }
        }
        const checker1 = this.calcChecker1(firstNineDigits);
        const checker2 = this.calcChecker2(firstNineDigits + '' + checker1);

        if (checker.toString() === checker1.toString() + checker2.toString()) {
            return true;
        } else {
            return false;
        }
    }
}

export const cpfValidator = new CPFValidator();
