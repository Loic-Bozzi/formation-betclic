import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/shared/models/client.model';

@Component({
  selector: 'app-form-clients',
  templateUrl: './form-clients.component.html',
  styleUrls: ['./form-clients.component.scss']
})
export class FormClientsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Output() public submitted: EventEmitter<any> = new EventEmitter();

  @Input() public client: Client = new Client();
  public formGroup: FormGroup;
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [this.client.id],
      state: [this.client.state],
      name: [this.client.name, Validators.compose([Validators.required, Validators.minLength(3)])],
      ca: [this.client.ca],
      comment: [this.client.comment, Validators.minLength(2)],
    });
  }

  /**
   * OnSubmit form
   */
  public onSubmit() {
    this.submitted.emit(this.formGroup.value);
  }
}
