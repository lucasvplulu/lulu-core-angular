import * as _moment from 'moment';

const moment = _moment;

export function isRequired(value) {
  return value !== undefined && value !== null && value.length > 0;
}

export function isMax(value, max) {
  return value.length <= max;
}

export function isNumber(value) {
  const regex = /^\d*$/;
  return regex.test(value);
}

export function notEmpty(value) {
  return value ? value : false;
}

export function numberOrZero(value) {
  return isNumber(notEmpty(value)) ? Number.parseInt(value) : 0;
}

export function sun(...val) {
  return val.reduce((pv, cv) => numberOrZero(cv) + pv, 0);
}

export function firstNameLengthIsValid(name) {
  const firstName = name.split(' ');
  return firstName[0].trim().length > 0 ? firstName[0].trim().length >= 2 : true;
}

export function firstNameIsValid(name) {
  const firstName = name.split(' ');
  return firstName.length >= 2 && firstName[1].length >= 1;
}

export function fullNameLengthIsValid(fullName) {
  return fullName.length <= 70;
}

export function containsMoreThanTwoRepeatedCharacters(fullName) {
  const regex = /([a-zA-Z])\1{2}/g;
  return !regex.test(fullName);
}

export function containsMoreThanOneConsecutiveAbbreviation(fullName) {
  const regex = /(\b.\s)(.\s)(.\b)\1?/g;
  return !regex.test(fullName);
}

export function containsMoreThanOneConsecutiveBlankSpace(fullName) {
  const regex = /(\w[ ]{2,}\w)/;
  return !regex.test(fullName);
}

/**
* Validada se nome não contém caracteres especiais.
* @param fullName Nome completo.
* @returns boolean de acordo com a validação.
 */
export function containsSpecialCharacters(fullName) {
    const regex = /[[\]!@#$%&*_+=`´{}^~<>.,:;?|()\/\\-]/;
    return !regex.test(fullName);
}

export function removeWhiteSpaces(msg: string) {
    if (msg && String(msg)) {
        return String(msg).replace(/\s/g,"");
    }
    return String(msg);
}

export function isValidPIS(pis) {
  const multiplicadorBase = '3298765432';
  let total = 0;
  let resto = 0;
  let multiplicando = 0;
  let multiplicador = 0;
  let digito = 99;

  // Retira a mascara
  const numeroPIS = pis.replace(/[^\d]+/g, '');

  if (
    numeroPIS.length !== 11 ||
    numeroPIS === '00000000000' ||
    numeroPIS === '11111111111' ||
    numeroPIS === '22222222222' ||
    numeroPIS === '33333333333' ||
    numeroPIS === '44444444444' ||
    numeroPIS === '55555555555' ||
    numeroPIS === '66666666666' ||
    numeroPIS === '77777777777' ||
    numeroPIS === '88888888888' ||
    numeroPIS === '99999999999'
  ) {
    return false;
  } else {
    for (let i = 0; i < 10; i++) {
      multiplicando = parseInt(numeroPIS.substring(i, i + 1));
      multiplicador = parseInt(multiplicadorBase.substring(i, i + 1));
      total += multiplicando * multiplicador;
    }

    resto = 11 - (total % 11);
    resto = resto === 10 || resto === 11 ? 0 : resto;

    digito = parseInt('' + numeroPIS.charAt(10));
    return resto === digito;
  }
}

export function validateBirthDate(birthday, date) {
  if (birthday && date) {
    const birthdayCompare = moment(typeof birthday === 'string' ? birthday.replace(/[^\d]+/g, '') : birthday, 'DDMMYYYY')
      .format('YYYY-MM-DD')
      .toString();
    const dateCompare = moment(date.replace(/[^\d]+/g, ''), 'DDMMYYYY')
      .format('YYYY-MM-DD')
      .toString();
    return moment(dateCompare).isSameOrAfter(birthdayCompare);
  }
}

export function isBirthDayValid(birthdayCompare, dateCompare) {
  if (birthdayCompare && dateCompare) {
    return dateCompare.isSameOrAfter(birthdayCompare);
  }
}

export function isDateExpirationBeforeExpeditionDate(expeditionDateCompare, dateCompare) {
  if (expeditionDateCompare && dateCompare) {
    return dateCompare.isSameOrAfter(expeditionDateCompare);
  }
}

export function isDateSameOrAfterCurrentDate(dateCompareMoment) {
  if (dateCompareMoment) {
    const currentDateCompare = moment();
    return dateCompareMoment.isSameOrAfter(currentDateCompare);
  }
}

export function isDateCompare(momentDate, momentDateCompare, compare) {
  if (momentDate && momentDate.isValid() && momentDateCompare && compare) {
    return momentDate[compare](momentDateCompare);
  }
  return true;
}
