import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit, OnDestroy {

  public clientCollection: Client[]
  constructor(private clientService: ClientsService, private router:Router) { }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  public headers: string[];
  public clientCollection$: Observable<Client[]>;
  public destroy$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.clientService.resfresh$.next(true);
    this.clientCollection$ = this.clientService.collection;

    this.headers = [
      "Id",
      "Name",
      "State",
      "Ca",
      "Comment",
    ]
  }

  public deleteClient(item: Client) {
    this.clientService.deleteItem(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result) => {
        this.clientService.resfresh$.next(true);
      }
    )
  }

  public gotoEdit(item: Client) {
    this.router.navigate(['clients', 'edit', item.id])
  }

  public AddClient() {
  }

}
