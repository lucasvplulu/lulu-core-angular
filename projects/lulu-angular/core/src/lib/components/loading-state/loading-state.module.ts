import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStateComponent } from './loading-state.component';
import { LoadingStateDirective } from './loading-state.directive';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ LoadingStateComponent, LoadingStateDirective ],
    exports: [ LoadingStateComponent, LoadingStateDirective ],
    entryComponents: [ LoadingStateComponent ],
})
export class LoadingStateModule {
}
