import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRecapClientsComponent } from './page-recap-clients.component';

describe('PageRecapClientsComponent', () => {
  let component: PageRecapClientsComponent;
  let fixture: ComponentFixture<PageRecapClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRecapClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRecapClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
