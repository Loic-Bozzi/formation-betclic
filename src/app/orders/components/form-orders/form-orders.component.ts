import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateOrder } from 'src/app/shared/enums/state-order.enum';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrls: ['./form-orders.component.scss']
})
export class FormOrdersComponent implements OnInit {

  @Input() public order: Order = new Order();

  @Output() public submitted: EventEmitter<Order> = new EventEmitter();

  public form: FormGroup;

  public states = Object.values(StateOrder);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tjmHt: [this.order.tjmHt, Validators.min(0)],
      nbJours: [this.order.nbJours],
      tva: [this.order.tva],
      state: [this.order.state],
      typePresta: [this.order.typePresta, Validators.minLength(2)],
      client: [this.order.client, Validators.required],
      comment: [this.order.comment, Validators.compose([Validators.minLength(3), Validators.required, Validators.email])],
      id: [this.order.id],
    });
  }

  public submitForm() {
    this.submitted.emit(this.form.value);
  }

}
