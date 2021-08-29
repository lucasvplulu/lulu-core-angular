import { PaginationData } from './pagination-data';

export interface WorkstationGroupFilterData {
    // "Texto para consulta"
    searchTex?: string;
    // "Id da empresa"
    companyId?: string;
    // "Id da filial"
    companyBranchId?: string;
    // "Id do departamento"
    departmentId?: string;
    // "Id do centro de custo"
    costcenterId?: string;
    // "Ids de cargo"
    jobpositionIds?: any;
    // "Id do sindicato"
    syndicateId?: string;
    // "Turno"
    shiftId?: string;
    // "Id da escala"
    workshiftId?: string;
    // "Id da turma"
    workshiftGroupId?: string;
    // "Id da turma intevalo"
    intervalGroupId?: string;
    // "Id da equipe"
    scaleTeamId?: string;
    // "Id da categoria"
    scaleCategoryId?: string;
    // "Id do vínculo"
    employmentRelationshipId?: string;
    // "Tipo contrato"
    contractType?: string;
    // "Id da natureza de despeza"
    expenseNatureId?: string;
    // "Permite deficiente"
    allowDeficient?: string;
    // "Deficiencias"
    disabilityIds?: any;
    // "Paginação da busca"
    page: PaginationData;
}
