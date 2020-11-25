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
import { IconsModule } from '../icons/icons.module';
import { PageEditClientsComponent } from './pages/page-edit-clients/page-edit-clients.component';
import { PageRecapClientsComponent } from './pages/page-recap-clients/page-recap-clients.component';


@NgModule({
  declarations: [PageListClientsComponent, PageAddClientsComponent, FormClientsComponent, PageEditClientsComponent, PageRecapClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    TemplatesModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class ClientsModule { }
