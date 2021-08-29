import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule as ToastModulePrimeng } from 'primeng/toast';

import { SharedModule } from '../shared/shared.module';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule, SharedModule, ToastModulePrimeng],
  declarations: [ToastComponent],
  providers: [ToastService, MessageService],
  exports: [ToastComponent],
})
export class ToastModule {}
