import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuComponent } from './components/icon-menu/icon-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconPageNotFoundComponent } from './components/icon-page-not-found/icon-page-not-found/icon-page-not-found.component';



@NgModule({
  declarations: [IconMenuComponent, IconPageNotFoundComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [IconMenuComponent, IconPageNotFoundComponent]
})
export class IconsModule { }
