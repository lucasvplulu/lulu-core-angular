import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PaginationShowcaseComponent } from "./pagination-showcase.component";

const routes: Routes = [
    {
        path: "pagination",
        component: PaginationShowcaseComponent,
        data: {
            breadcrumb: [
                {
                    name: "Component pagination",
                    routerLink: "pagination",
                },
            ],
        },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class PaginationShowcaseRoutingModule {
}
