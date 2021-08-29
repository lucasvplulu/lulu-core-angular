import { Component, OnInit } from '@angular/core';
import { DirectionEnumeration } from '@lulu-sistemas/lulu-core-angular';
import * as moment from 'moment';

@Component({
    selector: 'app-data-list-rest-showcase',
    templateUrl: './data-list-rest-showcase.component.html',
})
export class DataListRestShowcaseComponent implements OnInit {
    public loading = true;
    public orderBy = [{ field: 'hireDate', direction: DirectionEnumeration.DESC }];
    public parameters: any;
    public cols = [
        { label: 'Matrícula', field: 'registerNumber', tooltip: 'Matrícula' },
        { label: 'Nome', field: 'personName', tooltip: 'Nome' },
        { label: 'Departamento', field: 'departmentName', tooltip: 'Departamento' },
        { label: 'Admissão', field: 'hireDateShow', tooltip: 'Admissão' },
        { label: 'Situação', field: 'timeTrackingSituationName', tooltip: 'Situação' },
        { label: 'Empresa', field: 'companyName', tooltip: 'Empresa' },
        { label: 'Filial', field: 'branchName', tooltip: 'Filial' },
    ];
    public actions = (rowData: any, index: number) => {
        return [
            {
                label: 'Editar',
                command: () => {
                    alert('Editar');
                },
            },
        ];
    }

    constructor() { }

    ngOnInit() { }

    onLazyLoad(payload: any[]) {
        payload.forEach((value: any) => {
            value.hireDateShow = moment(value.hireDate).format('L');
            value.companyName = `${value.companyNumber} - ${value.companyName}`;
        });

        this.loading = false;
    }

    get scopedActions() {
        return this.actions.bind(this);
    }
}
