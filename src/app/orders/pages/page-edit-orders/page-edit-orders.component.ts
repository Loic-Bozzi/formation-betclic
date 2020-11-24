import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-orders',
  templateUrl: './page-edit-orders.component.html',
  styleUrls: ['./page-edit-orders.component.scss']
})
export class PageEditOrdersComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public order$: Observable<Order>;

  constructor(
    private currentRoute: ActivatedRoute,
    private orderClient: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.order$ = this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.orderClient.getItemById(params.get('id'));
      })
    )

    this.currentRoute.data.subscribe(
      (data) => {
        this.title = data.title;
        this.subtitle = data.subtitle;
      }
    )
  }

  public updateOrder(item: Order) {
      this.orderClient.updateItem(item).subscribe(
      (result) => {
      this.router.navigate(['orders']);
    });
  }

}
