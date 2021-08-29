import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ToastService } from './toast.service';

@Component({
  selector: 'l-toast',
  template: `
    <p-toast [ngClass]="breakLine ? 'ui-toast-break-line' : ''" [key]="key"></p-toast>
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  // Chave para garantir que as mensagens adicionadas por esse serviço
  // sejam exibidas apenas nesse componente.
  public key = 'TOAST';
  public breakLine: boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(private toastService: ToastService, private messageService: MessageService, private translateService: TranslateService) {}

  ngOnInit() {
    this.toastService
      .loadErrorMessages()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(payload => {
          this.createErrorMessage(payload && payload.message);
          this.breakLine = payload && payload.breakLine;
      });

    this.toastService
      .loadSuccessMessages()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(payload => {
          this.createSuccessMessage(payload && payload.message);
          this.breakLine = payload && payload.breakLine;
      });

    this.toastService
      .loadWarningMessages()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(payload => {
          this.createWarningMessage(payload && payload.message);
          this.breakLine = payload && payload.breakLine;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  createErrorMessage(message: string, summary?: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: summary || "Erro",
      detail: message,
      sticky: true,
      key: this.key,
    });
  }

  createSuccessMessage(message: string, summary?: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary || "Sucesso",
      detail: message,
      key: this.key,
    });
  }

  createWarningMessage(message: string, summary?: string) {
      this.messageService.add({
          severity: 'warn',
          summary: summary || "Alerta",
          detail: message,
          sticky: true,
          key: this.key,
      });
  }

}
