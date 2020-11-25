import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { Client } from 'src/app/shared/models/client.model';
import { Order } from 'src/app/shared/models/order.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-recap-clients',
  templateUrl: './page-recap-clients.component.html',
  styleUrls: ['./page-recap-clients.component.scss']
})
export class PageRecapClientsComponent implements OnInit {

  @Input() public ClientId: number;
  public headers: string[];

  public orderCollection: Order[];
  public orderCollection$: Observable<Order[]>;
  public client: Client;
  public client$: Observable<Client>;
  public destroy$: Subject<any> = new Subject();

  constructor(
    private orderService:OrdersService,
    private currentRoute: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router) { }

  ngOnInit(): void {
    this.headers = [
      "Id",
      "Type",
      "Client",
      "Nb. Jours",
      "Tjhm Ht",
      "Total HT",
      "Total TTC",
      "Etat",
      "Comment",
      "Actions"
    ]

    this.orderCollection$ = this.orderService.collection;
    this.orderService.resfresh$.next(true);
    this.clientService.resfresh$.next(true);

    // pipe imbrication ++
    this.orderCollection$ = this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.clientService.getItemById(params.get('id')).pipe(
          switchMap((client) => {
            return this.orderService.getItemsByClientName(client.name)
          })
        )
      })
    );
    // this.client$.subscribe(
    //   (client) => {
    //     this.orderCollection$.subscribe(
    //       (data) => {
    //         this.orderCollection$ = this.orderService.getItemsByClientName(client.name);
    //       }
    //     )
    //   }
    // );


    this.clientService.resfresh$.next(true)
    this.orderService.resfresh$.next(true)
  }
  public deleteClient(item: Order) {
    this.orderService.deleteItem(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result) => {
        this.clientService.resfresh$.next(true);
      }
    )
  }

  public gotoEdit(item: Order) {
    this.router.navigate(['orders', 'edit', item.id])
  }
}
