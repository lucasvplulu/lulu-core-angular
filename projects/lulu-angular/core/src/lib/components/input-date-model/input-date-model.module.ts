import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

import { InputDateModelComponent } from './input-date-model.component';

@NgModule({
  imports: [InputMaskModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [InputDateModelComponent],
  exports: [InputDateModelComponent],
})
export class InputDateModelModule {}
