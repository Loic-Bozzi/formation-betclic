import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { InvalidMessageDirective } from './invalid-message.directive';

@Directive({
  selector: '[appInvalidType]'
})
export class InvalidTypeDirective implements OnInit {

  constructor(
    private invalidMessage: InvalidMessageDirective,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  private hasView: boolean = false;
  @Input('invalidType') type: string;

  ngOnInit(): void {
    this.invalidMessage.controlValue$.subscribe(
      () => {
        this.setVisible();
      }
    )
  }

  public setVisible() {
    if(this.invalidMessage.match(this.type))
    {
      if(!this.hasView)
      {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    }else
    {
      if(this.hasView)
      {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }


}
