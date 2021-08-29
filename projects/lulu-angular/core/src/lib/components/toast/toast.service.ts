import { Observable, Subject } from 'rxjs';

export class ToastService {
  private messagesSubjectError = new Subject<object>();
  private messagesSubjectSuccess = new Subject<object>();
  private messagesSubjectWarning = new Subject<object>();

  constructor() {}

    /**
     * Exibe Toast de error (vermelho)
     * @param message
     * @param breakLine se deseja quebrar a mensagem caso tenha '\n' contido
     */
  showError(message, breakLine = false) {
    this.messagesSubjectError.next({ message: message, breakLine: breakLine });
  }
    /**
     * Exibe Toast de success (verde)
     * @param message
     * @param breakLine se deseja quebrar a mensagem caso tenha '\n' contido
     */
  showSuccess(message, breakLine = false) {
    this.messagesSubjectSuccess.next({ message: message, breakLine: breakLine });
  }
    /**
     * Exibe Toast de warning (amarelo)
     * @param message
     * @param breakLine se deseja quebrar a mensagem caso tenha '\n' contido
     */
  showWarning(message, breakLine = false) {
    this.messagesSubjectWarning.next({ message: message, breakLine: breakLine });
  }

  loadErrorMessages(): Observable<any> {
    return this.messagesSubjectError.asObservable();
  }

  loadSuccessMessages(): Observable<any> {
    return this.messagesSubjectSuccess.asObservable();
  }

  loadWarningMessages(): Observable<any> {
    return this.messagesSubjectWarning.asObservable();
  }
}
