import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class HttpFakeRequestInterceptor implements HttpInterceptor {
  operators: string[] = ['MTS', 'Beeline', 'Megafon'];

  constructor() {}

  private handleRoute({ url }: { url: string }) {
    let response: any;

    if (url.endsWith('/refill')) {
      const isError: boolean = Math.random() <= 0.5;
      response = isError ? throwError({ message: 'Can\'t refill.' }) : of(new HttpResponse({ status: 200 }));
    } else if (url.endsWith('/operators')) {
      response = of(new HttpResponse({ status: 200, body: { operators: this.operators } }));
    }

    return response;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return of(null).pipe(
      mergeMap(() => this.handleRoute(request)),
      materialize(),
      delay(1000),
      dematerialize()
    );
  }
}
