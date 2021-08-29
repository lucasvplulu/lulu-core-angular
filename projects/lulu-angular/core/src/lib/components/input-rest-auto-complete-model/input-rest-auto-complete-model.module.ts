import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {InputRestAutoCompleteModelComponent} from './input-rest-auto-complete-model.component';
import {InputRestAutoCompleteModelService} from './input-rest-auto-complete-model.service';
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
  declarations: [InputRestAutoCompleteModelComponent],
  providers: [InputRestAutoCompleteModelService],
  exports: [InputRestAutoCompleteModelComponent]
})
export class InputRestAutoCompleteModelModule {
}
