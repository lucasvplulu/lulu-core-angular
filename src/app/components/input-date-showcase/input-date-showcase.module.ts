import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ControlMessagesErrorModule, InputDateModule } from "@lulu-sistemas/lulu-core-angular";

import { InputDateShowcaseRoutingModule } from "./input-date-showcase-routing.module";
import { InputDateShowcaseComponent } from "./input-date-showcase.component";

@NgModule({
    imports: [ CommonModule, ReactiveFormsModule, InputDateShowcaseRoutingModule, InputDateModule, ControlMessagesErrorModule ],
    declarations: [ InputDateShowcaseComponent ],
})
export class InputDateShowcaseModule {
}
