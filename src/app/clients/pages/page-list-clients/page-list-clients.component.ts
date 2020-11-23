import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-clients',
  templateUrl: './page-list-clients.component.html',
  styleUrls: ['./page-list-clients.component.scss']
})
export class PageListClientsComponent implements OnInit {

  public clientCollection: Client[]
  constructor(private clientService: ClientsService) { }
  public headers: string[];

  ngOnInit(): void {
    this.clientService.collection.subscribe(
      (data) => {
        this.clientCollection = data;
      }
    );

    this.headers = [
      "Id",
      "Name",
      "State",
      "Ca",
      "Comment",
    ]
  }

  header

}
