import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { SharedModule } from '../shared/shared.module';
import { InputRestAutoCompleteComponent } from './input-rest-auto-complete.component';
import { InputRestAutoCompleteService } from './input-rest-auto-complete.service';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, AutoCompleteModule, SharedModule, ReactiveFormsModule],
  declarations: [InputRestAutoCompleteComponent],
  providers: [InputRestAutoCompleteService],
  exports: [InputRestAutoCompleteComponent],
})
export class InputRestAutoCompleteModule {}
