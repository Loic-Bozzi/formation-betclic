import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAddClientsComponent } from './pages/page-add-clients/page-add-clients.component';
import { PageEditClientsComponent } from './pages/page-edit-clients/page-edit-clients.component';
import { PageListClientsComponent } from './pages/page-list-clients/page-list-clients.component';
import { PageRecapClientsComponent } from './pages/page-recap-clients/page-recap-clients.component';

const routes: Routes = [
  { path: "", component: PageListClientsComponent},
  { path: "add", component: PageAddClientsComponent},
  { path: "edit/:id", component: PageEditClientsComponent,
    data: {title :"Clients", subtitle:"Edit"}},
  { path: "recap/:id", component: PageRecapClientsComponent,
    data: { title: "Clients", subtitle: "Recap"}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
