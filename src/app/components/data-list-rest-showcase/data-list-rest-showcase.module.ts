import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PanelModule } from "primeng/panel";
import { DataListRestModule } from "projects/lulu-angular/core/src/lib/components/data-list-rest/data-list-rest.module";

import { DataListRestShowcaseRoutingModule } from "./data-list-rest-showcase-routing.module";
import { DataListRestShowcaseComponent } from "./data-list-rest-showcase.component";

@NgModule({
    imports: [ CommonModule, DataListRestShowcaseRoutingModule, PanelModule, DataListRestModule ],
    declarations: [ DataListRestShowcaseComponent ],
})
export class DataListRestShowcaseModule {
}
