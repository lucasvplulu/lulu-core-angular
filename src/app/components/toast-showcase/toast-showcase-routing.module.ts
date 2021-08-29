import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ToastShowcaseComponent } from "./toast-showcase.component";

const routes: Routes = [
    {
        path: "toast",
        component: ToastShowcaseComponent,
        data: {
            breadcrumb: [
                {
                    name: "Component toast",
                    routerLink: "toast",
                },
            ],
        },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class ToastShowcaseRoutingModule {
}
