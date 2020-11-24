import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Console } from 'console';
import { Observable, Subscription } from 'rxjs';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
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

  constructor(private ordersClient:OrdersService) {

   }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
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
    this.orderCollection$ = this.ordersClient.collection;
    this.headers = [
      "Type",
      "Client",
      "Nb. Jours",
      "Tjhm Ht",
      "Total HT",
      "Total TTC",
      "Etat"
    ]
  }

  public changeState(item:Order, event: any) {
    this.ordersClient.changeState(item, event.target.value).subscribe(
      (result) => {
        item.state = result.state;
      }
    )
  }

  public AddOrder() {
  }

}
