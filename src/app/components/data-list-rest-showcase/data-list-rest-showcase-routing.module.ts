import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataListRestShowcaseComponent } from './data-list-rest-showcase.component';

const routes: Routes = [
  {
    path: 'data-list-rest',
    component: DataListRestShowcaseComponent,
    data: {
      breadcrumb: [
        {
          name: 'Component data-list-rest',
          routerLink: 'apportionment',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataListRestShowcaseRoutingModule {}
