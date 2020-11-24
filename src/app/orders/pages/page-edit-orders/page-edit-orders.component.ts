import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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

  @ViewChild('updateOrderModal') public updateOrderModalRef: TemplateRef<any>;

  public modalValues: Order;
  private currentActiveModal: NgbModalRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.order$ = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.ordersService.getItemById(params.get('id')))
      );

    this.activatedRoute.data.subscribe(
      (data) => {
        this.title = data.title;
        this.subtitle = data.subtitle;
      }
    )
  }

  public updateOrder(order: Order) {
    this.ordersService.updateItem(order).subscribe(
      (order) => {
        this.dismissUpdateModal();
        this.router.navigate(['orders']);
      }
    )
  }

  public openUpdateModal(values) {
    console.log("OpenModal");
    this.modalValues = values;
    this.currentActiveModal = this.modalService.open(this.updateOrderModalRef);
  }

  public dismissUpdateModal() {
    this.currentActiveModal.dismiss();
  }

}
