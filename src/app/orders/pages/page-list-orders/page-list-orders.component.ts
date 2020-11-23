import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.css']
})
export class PageListOrdersComponent implements OnInit {

  public headers: string[];
  constructor(private ordersClient:OrdersService) {

   }

  ngOnInit(): void {
    this.ordersClient.collection.subscribe(
      (data) => {
        console.log(data)
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
