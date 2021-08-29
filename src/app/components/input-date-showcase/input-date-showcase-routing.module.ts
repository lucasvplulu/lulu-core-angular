import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InputDateShowcaseComponent } from "./input-date-showcase.component";

const routes: Routes = [
    {
        path: "input-date",
        component: InputDateShowcaseComponent,
        data: {
            routeTitle: "Input date",
        },
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class InputDateShowcaseRoutingModule {
}
