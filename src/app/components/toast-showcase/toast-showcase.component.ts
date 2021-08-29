import { Component, OnInit } from "@angular/core";
import { ToastService } from "@lulu-sistemas/lulu-core-angular";

@Component({
    selector: "app-toast-showcase",
    templateUrl: "./toast-showcase.component.html",
})
export class ToastShowcaseComponent implements OnInit {
    constructor(private toastService: ToastService) {
    }

    public ngOnInit() {
    }

    public showSuccess() {
        const condition = Math.random() < 0.5;

        if (condition)
            this.toastService.showSuccess("Essa é uma mensagem de sucesso \n (com quebra)", true);
        else
            this.toastService.showSuccess("Essa é uma mensagem de sucesso \n (sem quebra)", false);
    }

    public showError() {
        const condition = Math.random() < 0.5;

        if (condition)
            this.toastService.showError("Essa é uma mensagem de sucesso \n (com quebra)", true);
        else
            this.toastService.showError("Essa é uma mensagem de sucesso \n (sem quebra)", false);
    }

    public showWarning() {
        this.toastService.showWarning("Essa é uma mensagem de warning");
    }
}
