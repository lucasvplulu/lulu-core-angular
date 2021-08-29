import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {InputRestAutoCompleteEnumComponent} from './input-rest-auto-complete-enum.component';
import {InputRestAutoCompleteEnumService} from './input-rest-auto-complete-enum.service';
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
  declarations: [InputRestAutoCompleteEnumComponent],
  providers: [InputRestAutoCompleteEnumService],
  exports: [InputRestAutoCompleteEnumComponent]
})
export class InputRestAutoCompleteEnumModule {
}
