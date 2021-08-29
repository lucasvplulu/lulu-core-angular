import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToastModule } from "@lulu-sistemas/lulu-core-angular";
import { ButtonModule } from "primeng/button";

import { ToastShowcaseRoutingModule } from "./toast-showcase-routing.module";
import { ToastShowcaseComponent } from "./toast-showcase.component";

@NgModule({
    imports: [ CommonModule, ToastShowcaseRoutingModule, ToastModule, ButtonModule ],
    declarations: [ ToastShowcaseComponent ],
})
export class ToastShowcaseModule {
}
