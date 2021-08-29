import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputRestAutoCompleteModelEnumComponent} from './input-rest-auto-complete-model-enum.component';
import {InputRestAutoCompleteModelEnumService} from './input-rest-auto-complete-model-enum.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AutoCompleteModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [InputRestAutoCompleteModelEnumComponent],
  providers: [InputRestAutoCompleteModelEnumService],
  exports: [InputRestAutoCompleteModelEnumComponent]
})
export class InputRestAutoCompleteModelEnumModule {
}
