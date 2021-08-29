import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IntegrationService } from "./integration.service";
import { AutocompleteParametersService } from "./autocomplete-parameters.service";


@NgModule({
    imports: [ CommonModule ],
    providers: [
        IntegrationService,
        AutocompleteParametersService,
    ]
})
export class ServicesModule {
}
