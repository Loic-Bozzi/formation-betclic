import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
    this.pCollection = this.http.get<Client[]>(`${this.urlApi}clients`);
  }

  private pCollection: Observable<Client[]>;
  private urlApi = environment.urlApi;

  get collection(): Observable<Client[]> {
    return this.pCollection;
  }
}
