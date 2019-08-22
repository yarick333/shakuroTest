import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRefillData } from '../models/refillData';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  refill(data) {
    return this.http.post<IRefillData>('/refill', data);
  }
}
