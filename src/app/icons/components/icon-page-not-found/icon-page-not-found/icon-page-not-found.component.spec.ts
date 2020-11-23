import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPageNotFoundComponent } from './icon-page-not-found.component';

describe('IconPageNotFoundComponent', () => {
  let component: IconPageNotFoundComponent;
  let fixture: ComponentFixture<IconPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
