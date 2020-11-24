import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { merge, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appInvalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {

  @Input() invalidRow: string;
  public hasView: boolean = false;
  public control: AbstractControl;
  public controlValue$: Observable<any>;
  public controlSubsciption: Subscription;
  public hasSubmitted: boolean;

  constructor(
    private fg: ControlContainer,
    private renderer: Renderer2,
    private el: ElementRef,

  ) { }

  ngOnDestroy(): void {
    this.controlSubsciption.unsubscribe();
  }

  ngOnInit(): void {
    this.control = this.form.get(this.invalidRow);
    let formSubmit$ = (<FormGroupDirective>this.fg).ngSubmit.pipe(
      map(() => {
        this.hasSubmitted = true;
      })
    )
    this.controlValue$ = merge(this.control.valueChanges, of(''), formSubmit$) ;
    this.controlSubsciption = this.controlValue$.subscribe(
      (newValue) =>
      {
        this.setVisible();
      }
    );
  }

  private setVisible() {
    if(this.control.invalid && (this.control.dirty || this.hasSubmitted))
    {
      this.renderer.removeStyle(this.el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  public match(error: string) {
    if(this.control?.errors) {
      if(Object.keys(this.control.errors).indexOf(error) > -1 ) {
        return true;
      }
    }
    return false;
  }

  public get form() {
    return this.fg.formDirective ? (this.fg.formDirective as FormGroupDirective).form : null;
  }

}
