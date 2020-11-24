import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-orders',
  templateUrl: './page-add-orders.component.html',
  styleUrls: ['./page-add-orders.component.css']
})
export class PageAddOrdersComponent implements OnInit {

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
  }

  public add(item: Order) {
    this.orderService.addItem(item).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
