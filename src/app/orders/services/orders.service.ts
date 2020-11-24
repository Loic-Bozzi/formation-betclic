import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/models/order.model';
import { map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
import { ObjectType } from 'typescript';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
    this.pCollection = this.http.get<Order[]>(`${this.urlApi}orders`).pipe(
      map((collection) => {
        return collection.map((obj) => {
          return new Order(obj);
        })
      })
    );
  }

  private pCollection: Observable<Order[]>;
  private urlApi = environment.urlApi;

  get collection(): Observable<Order[]> {
    return this.pCollection;
  }

  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = new Order({...item});
    obj.state = state;
    return this.updateItem(obj);
  }

  public updateItem(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}orders/${item.id}`, item);
  }

  public addItem(item: Order): Observable<Order> {
        return this.http.post<Order>(`${this.urlApi}orders`, item);
  }
}
