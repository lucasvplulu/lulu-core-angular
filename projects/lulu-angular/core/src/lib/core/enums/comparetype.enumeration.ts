/**
 * Enum com as funções de comparação da biblioteca Moment.js
 * Não contempla a função isBetween, será necessário fazer uma validação esoecífica para usá-la
 */
export enum CompareType {
    isBefore = "isBefore",
    isAfter = "isAfter",
    isSame = "isSame",
    isSameOrAfter = "isSameOrAfter",
    isSameOrBefore = "isSameOrBefore",
    isNotSame = "isNotSame",
}
