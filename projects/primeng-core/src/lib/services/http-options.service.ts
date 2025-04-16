import { Inject, Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { API_ENDPOINT, CLIENT_ID, CLIENT_KEY } from 'projects/primeng-core/src/lib/common/utils';

@Injectable({
  providedIn: 'root'
})
export class HttpOptions {
  private readonly httpClient: HttpClient;

  constructor(
    private httpBackend: HttpBackend,
    @Inject(API_ENDPOINT) private apiEndPoint: string,
    @Inject(CLIENT_ID) private clientId: string,
    @Inject(CLIENT_KEY) private clientKey: string) {
    this.httpClient = new HttpClient(httpBackend);
  }

  private get secretKey(): string {
    let key = btoa(`logusbrain ${this.clientId}:${this.clientKey}`)
    return key
  }

  get headers() {
    return {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  get http(): HttpClient {
    return this.httpClient;
  }

  get url(): string {
    return this.apiEndPoint;
  }

  get urlV1(): string {
    return `${this.apiEndPoint}v1/`;
  }
}
