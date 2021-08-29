/**
 * Interface para ser usada nos parâmetros de validação de datas
 * @param useG5DateRange Caso não seja necessário validar o intervalo de datas conforme a G5, informar false.
 * (Opcional, default é validar conforme G5)
 */
export interface DateValidateOptions {
    useG5DateRange?: boolean;
}
