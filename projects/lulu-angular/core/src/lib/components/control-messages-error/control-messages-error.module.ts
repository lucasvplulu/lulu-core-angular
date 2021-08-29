import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ControlMessagesErrorComponent } from './control-messages-error.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  declarations: [ControlMessagesErrorComponent],
  exports: [ControlMessagesErrorComponent],
})
export class ControlMessagesErrorModule {}
