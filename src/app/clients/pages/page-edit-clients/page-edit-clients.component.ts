import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-edit-clients',
  templateUrl: './page-edit-clients.component.html',
  styleUrls: ['./page-edit-clients.component.scss']
})
export class PageEditClientsComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public client$: Observable<Client>;

  constructor(
    private currentRoute: ActivatedRoute,
    private clientClient: ClientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client$ = this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.clientClient.getItemById(params.get('id'));
      })
    )

    this.currentRoute.data.subscribe(
      (data) => {
        this.title = data.title;
        this.subtitle = data.subtitle;
      }
    )
  }

  public updateClient(item: Client) {
      this.clientClient.updateItem(item).subscribe(
      (result) => {
      this.router.navigate(['clients']);
    });
  }

}
