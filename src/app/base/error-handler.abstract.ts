import { HttpErrorResponse } from '@angular/common/http';
import { IErrorHandler } from '../interfaces';
import { Observable } from 'rxjs';

export abstract class ErrorHandlerAbstract implements IErrorHandler {
  protected readonly errorMessages: Record<number, string> = {
    // Erros de Rede
    0: 'Sem conexão com a internet. Verifique sua conexão!',

    // Erros do Cliente (4xx)
    400: 'Os dados enviados estão incorretos!',
    401: 'Você precisa fazer login para continuar!',
    403: 'Você não tem permissão para realizar esta ação!',
    404: 'O recurso solicitado não foi encontrado!',
    405: 'Operação não permitida!',
    408: 'A requisição demorou muito. Tente novamente!',
    409: 'Conflito com o estado atual do recurso!',
    422: 'Dados inválidos. Verifique as informações!',
    429: 'Muitas tentativas. Aguarde um momento!',

    // Erros do Servidor (5xx)
    500: 'Erro no servidor. Tente novamente mais tarde!',
    502: 'Serviço temporariamente indisponível!',
    503: 'Serviço em manutenção. Tente mais tarde!',
    504: 'Tempo limite excedido. Tente novamente!',
  };

  protected getDefaultErrorMessage(status: number): string {
    return (
      this.errorMessages[status] ||
      'Ocorreu um erro inesperado. Tente novamente!'
    );
  }

  protected getDebugMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const message =
        error.error?.message ||
        error.error?.detail ||
        error.error?.title ||
        error.error?.error ||
        (typeof error.error === 'string' ? error.error : '') ||
        error.message ||
        error.statusText;

      return `[${error.status}] ${message} | URL: ${error.url}`;
    }

    return error as string;
  }

  abstract handleError(error: unknown): Observable<never>;
}
