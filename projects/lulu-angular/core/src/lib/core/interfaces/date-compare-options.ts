import { unitOfTime } from 'moment';

/**
 * Interface para ser usada nos parâmetros de validação de datas
 * @param compareName Nome da chave que será retornada, se não for informada o nome será igual ao tipo da comparação. (Opcional)
 * @param granularity Granularidade da comparação. Ex.: 'day', 'mounth', 'year'. (Opcional, default igual a 'day')
 */
export interface DateCompareOptions {
    compareName?: string;
    granularity?: unitOfTime.StartOf;
}
