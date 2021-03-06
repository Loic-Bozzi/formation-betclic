import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
import { Client } from 'src/app/shared/models/client.model';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss']
})
export class PageListOrdersComponent implements OnInit, OnDestroy {

  public headers: string[];
  public orderCollection: Order[];
  //public subscription: Subscription;
  public states = Object.values(StateOrder);
  public orderCollection$: Observable<Order[]>;
  public destroy$: Subject<any> = new Subject();
  public clientCollection: Client[];
  public clientCollection$: Observable<Client[]>;

  constructor(private ordersClient:OrdersService,
    private clientService: ClientsService,
    private router:Router) {

   }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    // this.subscription = this.ordersClient.collection.subscribe(
    //   (data) => {
    //     this.orderCollection = data;
    //   },
    //   (error) => {
    //     console.log(`order client get in error ${error}`)
    //   }
    // );
    this.ordersClient.resfresh$.next(true);
    this.orderCollection$ = this.ordersClient.collection;
    this.clientService.resfresh$.next(true);
    this.clientCollection$ = this.clientService.collection;
    this.clientCollection$.subscribe(
      (data) => {
        this.clientCollection = data;
      }
    )
    this.headers = [
      "Type",
      "Client",
      "Nb. Jours",
      "Tjhm Ht",
      "Total HT",
      "Total TTC",
      "Etat",
      "Actions"
    ]
  }

  public changeState(item:Order, event: any) {
    this.ordersClient.changeState(item, event.target.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result) => {
        item.state = result.state;
      }
    )
  }

  public changeClient(item:Order, event: any) {
    this.ordersClient.changeClient(item, event.target.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result) => {
        item.client = result.client;
      }
    )
  }

  public deleteOrder(item: Order) {
    this.ordersClient.deleteItem(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (res) => {
        this.ordersClient.resfresh$.next(true);
      }
    );
  }

  public gotoEdit(item: Order) {
    this.router.navigate(['orders', 'edit', item.id])
  }

  public AddOrder() {
  }

  public getOrderByClientName(name: string) {
    //this.ordersClient.getItemByClientName();
  }

}
