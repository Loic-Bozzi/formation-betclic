import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
    this.pCollection = this.http.get<Order[]>(`${this.urlApi}orders`);
  }

  private pCollection: Observable<Order[]>;
  private urlApi = environment.urlApi;

  get collection(): Observable<Order[]> {
    return this.pCollection;
  }
}
