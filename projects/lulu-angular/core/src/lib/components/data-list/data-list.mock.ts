import { of } from 'rxjs';

export class DataListMock {
  private static list = [
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
      {
        identifier: 'ID201712141452500001',
        environmentCode: '0001',
        environmentDescription: 'Ambiente de Teste',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500001',
      },
      {
        identifier: 'ID201712141452500002',
        environmentCode: '0001',
        environmentDescription: 'Ambiente ABC',
        operationType: 'Alteração',
        environmentlist: 'REC12141452500002',
      },
      {
        identifier: 'ID201712141452500003',
        environmentCode: '0001',
        environmentDescription: 'Ambiente XYZ',
        operationType: 'Inclusão',
        environmentlist: 'REC12141452500003',
      },
    ];
  constructor() {}

  static getList() {
    return of(this.list);
  }
}
