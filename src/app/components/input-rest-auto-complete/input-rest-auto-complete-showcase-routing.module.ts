import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InputRestAutoCompleteShowcaseComponent } from "./input-rest-auto-complete-showcase.component";

const routes: Routes = [
    {
        path: "input-rest-auto-complete",
        component: InputRestAutoCompleteShowcaseComponent,
        data: {
            breadcrumb: [
                {
                    name: "Component input-rest-auto-complete",
                    routerLink: "/input-rest-auto-complete",
                },
            ],
        },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class InputRestAutoCompleteShowcaseRoutingModule {
}
