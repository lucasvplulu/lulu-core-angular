import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ErrorPageComponent],
  exports: [ErrorPageComponent],
  providers: [],
})
export class ErrorPageModule {}
