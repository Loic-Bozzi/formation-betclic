import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
    this.resfresh$.subscribe(
      (refreshing) => {
        if(refreshing == true)
        {
          this.http.get<Client[]>(`${this.urlApi}clients`).pipe(
            map((collection) => {
              return collection.map((obj) => {
                return new Client(obj);
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

  private pCollection: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private urlApi = environment.urlApi;
  public resfresh$: Subject<boolean> = new Subject();

  get collection(): Observable<Client[]> {
    return this.pCollection.asObservable();
  }

  public updateItem(item: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlApi}clients/${item.id}`, item);
  }

  public addItem(item: Client): Observable<Client> {
        return this.http.post<Client>(`${this.urlApi}clients`, item);
  }

  public deleteItem(item: Client): Observable<Client> {
    return this.http.delete<Client>(`${this.urlApi}clients/${item.id}`);
  }

  public getItemById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.urlApi}clients/${id}`);
  }


  // public deleteItem(item: Order): Observable<Order> {
  //   return this.http.delete<Order>(`${this.urlApi}orders/${item.id}`);
  // }
}
