import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePaymentsComponent } from './applications.component';

describe('ApplicationsComponent', () => {
  let component: ManagePaymentsComponent;
  let fixture: ComponentFixture<ManagePaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePaymentsComponent]
    });
    fixture = TestBed.createComponent(ManagePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
