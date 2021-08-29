import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

import { SharedModule } from '../shared/shared.module';
import { DataListRestComponent } from './data-list-rest.component';
import { ButtonModule } from "primeng/button";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // Primeng
    TableModule,
    TooltipModule,
    ButtonModule,
  ],
  declarations: [DataListRestComponent],
  exports: [DataListRestComponent],
})
export class DataListRestModule {}
