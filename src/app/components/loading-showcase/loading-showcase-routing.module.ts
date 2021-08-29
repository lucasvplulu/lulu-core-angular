import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoadingShowcaseComponent } from "./loading-showcase.component";

const routes: Routes = [
    {
        path: "loading",
        component: LoadingShowcaseComponent,
        data: {
            breadcrumb: [
                {
                    name: "Component loading",
                    routerLink: "loading",
                },
            ],
        },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class LoadingShowcaseRoutingModule {
}
