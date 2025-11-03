import { catchError, Observable } from 'rxjs';
import { ErrorHandlerAbstract } from '../base/error-handler.abstract';

export abstract class HttpServiceHandler extends ErrorHandlerAbstract {
  protected invokeHttp<TResponse, TRequest>(
    endpoint: string,
    payload: TRequest | undefined,
    callback: (e: string, p: TRequest | undefined) => Observable<TResponse>
  ): Observable<TResponse> {
    return callback(endpoint, payload).pipe(
      catchError(
        (error) => this.handleError(error) // `this.handleError` chama a implementação da classe concreta
      )
    );
  }
}
