import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

import { InputDateComponent } from './input-date.component';

@NgModule({
  imports: [InputMaskModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [InputDateComponent],
  exports: [InputDateComponent],
})
export class InputDateModule {}
