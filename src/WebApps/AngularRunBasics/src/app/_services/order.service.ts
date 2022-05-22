import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = "/APIGateWay/Order";
  constructor(private http: HttpClient) { }
  getOrders() {


    return this.http.get(this.baseUrl);
  }
}
