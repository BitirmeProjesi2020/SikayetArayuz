import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupcustomerComponent } from './signupcustomer.component';

describe('SignupcustomerComponent', () => {
  let component: SignupcustomerComponent;
  let fixture: ComponentFixture<SignupcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
