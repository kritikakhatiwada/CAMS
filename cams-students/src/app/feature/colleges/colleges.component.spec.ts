import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegesComponent } from './colleges.component';

describe('CollegesComponent', () => {
  let component: CollegesComponent;
  let fixture: ComponentFixture<CollegesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegesComponent]
    });
    fixture = TestBed.createComponent(CollegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
