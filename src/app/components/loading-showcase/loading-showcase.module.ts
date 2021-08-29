import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingStateModule, ToastModule } from "@lulu-sistemas/lulu-core-angular";
import { ButtonModule } from "primeng/button";

import { LoadingShowcaseRoutingModule } from "./loading-showcase-routing.module";
import { LoadingShowcaseComponent } from "./loading-showcase.component";

@NgModule({
    imports: [ CommonModule, LoadingShowcaseRoutingModule, LoadingStateModule, ButtonModule ],
    declarations: [ LoadingShowcaseComponent ],
})
export class LoadingShowcaseModule {
}
