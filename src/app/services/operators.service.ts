import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  constructor(private http: HttpClient) { }

  getOperators() {
    return this.http.get('/operators').pipe(
      map((response: { operators: string[] }) => response.operators)
    );
  }
}
