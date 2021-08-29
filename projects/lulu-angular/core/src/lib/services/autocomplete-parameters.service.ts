import { Injectable } from "@angular/core";
import { HttpClientService } from "../components/shared/http-client.service";
import { CoreFieldType } from "../core/enums";
import * as _moment from "moment";
import { map } from "rxjs/operators";
import { ServiceType } from "../core/enums";


const moment = _moment;

@Injectable({
    providedIn: "root"
})
export class AutocompleteParametersService {

    constructor(private httpClienteService: HttpClientService) {
    }

    public getAutoComplete(entity: string, params: object, searchFields: any, codeIsString: boolean, service: ServiceType) {
        const getParams = this.generateGridParameters(params, searchFields, codeIsString);
        return this.httpClienteService.getAutoComplete(entity, getParams, service)
            .pipe(map((result) => result && result.contents));
    }

    public getAutoCompleteQuery(query: string, params: object) {
        return this.httpClienteService.query(query, params)
            .pipe(map((data) => data && data.result));
    }

    /**
     * Gera os parametros de pesquisa via pesquisa na grid
     * @param filterData
     */
    private generateGridParameters(filterData: object, searchFields: any, codeIsString: boolean): string {
        let gridParameters = "";
        Object.keys(filterData).forEach((attribute: string) => {
            const filterSearchField = searchFields && searchFields.filter(field => attribute === field.name)[0];
            let filterQueryString = null;
            let operatorsQuery = "";
            let searchField: any = filterSearchField && filterSearchField.type;
            if (!filterSearchField && attribute === CoreFieldType.searchValue) searchField = CoreFieldType.searchValue;
            if (gridParameters) operatorsQuery = " and ";
            filterQueryString = this.getParameterByType(searchField, attribute, filterData[attribute], codeIsString);
            if (filterQueryString) gridParameters += ` ${ operatorsQuery } ${ filterQueryString }`;
        });
        return gridParameters;
    }

    /**
     * Gera a string de consulta CRUD de um campo.
     * @param type Tipo do campo.
     * @param attribute Nome do atribute da entidade
     * @param value Valor do campo
     */
    private getParameterByType(type: any, attribute: string, value: any, codeIsString: boolean): string {
        if (!value && type != CoreFieldType.searchValue) return `${ attribute } is null`;
        if (value && value === "not null" && type != CoreFieldType.searchValue) return `${ attribute } is not null`;
        switch (type) {
            case "Date":
                return `${ attribute } eq '${ moment(value).format("YYYY-MM-DD") }'`;
            case "Enum":
                return `${ attribute } eq '${ value }'`;
            case "Integer":
                return `${ attribute } eq ${ value }`;
            case "Autocomplete":
                return `${ attribute } eq '${ value.id }'`;
            case CoreFieldType.searchValue:
                return `${ this.getParameterBySearchType(value, codeIsString) }`;
            default:
                return this.getSearchFilterString(attribute, value);
        }
    }

    /**
     * Retorna o filtro formatador para ser chamdo no endpoint
     * @param valueFilterSearch valor pra adicionar no filtro
     */
    private getParameterBySearchType(valueFilterSearch: any, codeIsString: boolean): string {
        let searchFilter = "";
        if (valueFilterSearch) {
            for (const [ key, value ] of Object.entries(valueFilterSearch)) {
                if (key === "code" && Number(value)) {
                    const hasQuote = codeIsString ? "'" : "";
                    if (searchFilter)
                        searchFilter += ` or ${ key } eq ${ hasQuote }${ value }${ hasQuote }`;
                    else
                        searchFilter += `${ key } eq ${ hasQuote }${ value }${ hasQuote }`;
                } else if (key != "code") {
                    if (searchFilter)
                        searchFilter += ` or ${ this.getSearchFilterString(key, value) }`;
                    else
                        searchFilter += this.getSearchFilterString(key, value);
                }
            }
            searchFilter = searchFilter ? `(${ searchFilter })` : "";
        }
        return searchFilter;
    }

    /**
     * Formata o filtro quando for "Ou"
     * @param attribute
     * @param value
     */
    private getSearchFilterString(attribute: string, value: any): string {
        return `containing(lower(${ attribute }), lower('${ value }'))`;
    }

}
