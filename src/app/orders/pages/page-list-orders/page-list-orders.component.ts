import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.css']
})
export class PageListOrdersComponent implements OnInit {

  public headers: string[];
  public orderCollection: Order[];

  constructor(private ordersClient:OrdersService) {

   }

  ngOnInit(): void {
    this.ordersClient.collection.subscribe(
      (data) => {
        this.orderCollection = data;
      },
      (error) => {
        console.log(`order client get in error ${error}`)
      }
    );
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

}
