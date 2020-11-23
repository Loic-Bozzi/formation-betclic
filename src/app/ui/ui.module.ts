import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { UiComponent } from './components/ui/ui.component';
import { TestComponent } from './components/test/test.component';
import { IconsModule } from '../icons/icons.module';


@NgModule({
  declarations: [UiComponent, TestComponent],
  imports: [
    CommonModule,
    UiRoutingModule,
    IconsModule,
  ],
  exports: [
    UiComponent
  ]
})
export class UiModule { }
