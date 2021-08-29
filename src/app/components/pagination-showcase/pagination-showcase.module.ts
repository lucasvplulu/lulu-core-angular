import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationShowcaseRoutingModule } from "./pagination-showcase-routing.module";
import { PaginationShowcaseComponent } from "./pagination-showcase.component";
import { PaginationModule } from "@lulu-sistemas/lulu-core-angular";

@NgModule({
    imports: [ CommonModule, PaginationShowcaseRoutingModule, PaginationModule ],
    declarations: [ PaginationShowcaseComponent ],
})
export class PaginationShowcaseModule {
}
