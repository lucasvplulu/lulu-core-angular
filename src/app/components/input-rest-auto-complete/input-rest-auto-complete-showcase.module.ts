import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputDateModule, InputRestAutoCompleteModule, } from "@lulu-sistemas/lulu-core-angular";

import { InputRestAutoCompleteShowcaseRoutingModule } from "./input-rest-auto-complete-showcase-routing.module";
import { InputRestAutoCompleteShowcaseComponent } from "./input-rest-auto-complete-showcase.component";

@NgModule({
    imports: [ CommonModule, InputRestAutoCompleteShowcaseRoutingModule, InputRestAutoCompleteModule, InputDateModule ],
    declarations: [ InputRestAutoCompleteShowcaseComponent ],
})
export class InputRestAutoCompleteShowcaseModule {
}
