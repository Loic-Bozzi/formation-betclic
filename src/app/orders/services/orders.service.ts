import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/shared/models/order.model';
import { map } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
import { ObjectType } from 'typescript';
import { combineLatest, CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {

    this.resfresh$.subscribe(
      (refreshing) => {
        if(refreshing == true)
        {
          this.http.get<Order[]>(`${this.urlApi}orders`).pipe(
            map((collection) => {
              return collection.map((obj) => {
                return new Order(obj);
              })
            })
          ).subscribe(
            (data) => {
              this.pCollection.next(data);
            }
          );
        }
      }
    )
  }

  private pCollection: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  private urlApi = environment.urlApi;
  public resfresh$: Subject<boolean> = new Subject();

  get collection(): Observable<Order[]> {
    return this.pCollection.asObservable();
  }

  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = new Order({...item});
    obj.state = state;
    return this.updateItem(obj);
  }

  public changeClient(item: Order, client: string): Observable<Order> {
    const obj = new Order({...item});
    obj.client = client;
    return this.updateItem(obj);
  }

  public updateItem(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}orders/${item.id}`, item);
  }

  public addItem(item: Order): Observable<Order> {
        return this.http.post<Order>(`${this.urlApi}orders`, item);
  }

  public deleteItem(item: Order): Observable<Order> {
    return this.http.delete<Order>(`${this.urlApi}orders/${item.id}`);
  }

  public getItemById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}orders/${id}`);
  }

  public getItemByClientName(name: string): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}orders?client=${name}`);
  }

  public getItemsByClientName(name: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.urlApi}orders?client=${name}`).pipe(
            map((collection) => this.serializeOrder(collection))
          );
  }

  public getItem2ByClientName(name: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.urlApi}orders2?client=${name}`).pipe(
            map((collection) => this.serializeOrder(collection))
          );
  }

  public getAllItems(name: string): Observable<Order[]> {
    return forkJoin([this.getItemsByClientName(name), this.getItem2ByClientName(name)]).pipe(
      map(([result1, result2]) => {
        return result1.concat(result2);
      })
    );
  }

  public getAllItems2(name: string): Observable<Order[]> {
    return combineLatest([this.getItemsByClientName(name), this.getItem2ByClientName(name)]).pipe(
      map(([result1, result2]) => {
        return result1.concat(result2);
      })
    );
  }

  private serializeOrder(collection: Order[]): Order[] {
    return collection.map((obj) => {
      return new Order(obj);
    })
  }

}
