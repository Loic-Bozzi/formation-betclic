import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavComponent],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    NavComponent,
    HeaderComponent,
    FooterComponent
    ]
})
export class CoreModule { }
