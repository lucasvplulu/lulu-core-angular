import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";


import { HotkeyModule } from "angular2-hotkeys";
import { ToastModule } from "primeng/toast";
import { HttpClientService } from "projects/lulu-angular/core/src/public_api";

import { AppComponent } from "./app.component";
import { DataListRestShowcaseModule } from "./components/data-list-rest-showcase/data-list-rest-showcase.module";
import { InputDateShowcaseModule } from "./components/input-date-showcase/input-date-showcase.module";
import { InputRestAutoCompleteShowcaseModule } from "./components/input-rest-auto-complete/input-rest-auto-complete-showcase.module";
import { ToastShowcaseModule } from "./components/toast-showcase/toast-showcase.module";
import { ButtonModule } from "primeng/button";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { LoadingShowcaseModule } from "./components/loading-showcase/loading-showcase.module";
import { PaginationShowcaseModule } from "./components/pagination-showcase/pagination-showcase.module";

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        HotkeyModule.forRoot(),
        ToastModule,
        TranslateModule.forRoot(),
        DataListRestShowcaseModule,
        InputDateShowcaseModule,
        ToastShowcaseModule,
        InputRestAutoCompleteShowcaseModule,
        TranslateModule.forRoot(),
        ButtonModule,
        MegaMenuModule,
        MenuModule,
        PaginationShowcaseModule,
        LoadingShowcaseModule,
    ],
    providers: [ HttpClientService ],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
