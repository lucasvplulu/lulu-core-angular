import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { DataListComponent } from './data-list.component';
import { DataListService } from './data-list.service';
import { ButtonModule } from "primeng/button";

@NgModule({
    imports: [
        CommonModule,
        // Primeng
        TableModule,
        TooltipModule,
        ButtonModule,
    ],
  declarations: [DataListComponent],
  exports: [DataListComponent],
  providers: [DataListService],
})
export class DataListModule {}
