import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TPayloadRequest, TViaCep } from '../types/types';
import { HttpServiceHandler } from './http-service-handler';
import toAddress from '../utils/to-address';

import {
  IHttpBinResponse,
  IJsonServerResponse,
  IPayloadResponse,
  IRawViaCepResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService extends HttpServiceHandler {
  constructor(private _http: HttpClient) {
    super();
  }

  public getAddressFromViaCep(zipCode: string): Observable<TViaCep> {
    return this.invokeHttp(
      `${environment.viaCepEndpoint}${zipCode}/json`,
      undefined,
      (endpointParam) =>
        this._http.get<IRawViaCepResponse>(endpointParam).pipe(map(toAddress))
    );
  }

  public postToJsonServer(data: TPayloadRequest): Observable<IPayloadResponse> {
    return this.invokeHttp(
      `${environment.jsonServerEndpoint}`,
      data,
      (endpointParam, payloadParam) =>
        this._http.post<IJsonServerResponse>(endpointParam, payloadParam)
    );
  }

  public postToIHttpBin(data: TPayloadRequest): Observable<IPayloadResponse> {
    return this.invokeHttp(
      `${environment.endpointUri}`,
      data,
      (endpointParam, payloadParam) =>
        this._http
          .post<IHttpBinResponse<IPayloadResponse>>(endpointParam, payloadParam)
          .pipe(map((response) => response.json as IPayloadResponse))
    );
  }

  override handleError(error: unknown): Observable<never> {
    console.error(this.getDebugMessage(error));
    let status =
      error instanceof HttpErrorResponse
        ? error.status
        : typeof error === 'object' && error != null && 'status' in error
        ? (error as { status: number }).status
        : 0;
    return throwError(() => this.getDefaultErrorMessage(status));
  }
}

export { HttpClient };
