import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { TemplatesModule } from '../templates/templates.module';
import { PageAddClientsComponent } from './pages/page-add-clients/page-add-clients.component';
import { FormClientsComponent } from './components/form-clients/form-clients.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageListClientsComponent, PageAddClientsComponent, FormClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    TemplatesModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
