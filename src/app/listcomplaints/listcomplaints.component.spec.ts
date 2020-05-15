import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcomplaintsComponent } from './listcomplaints.component';

describe('ListcomplaintsComponent', () => {
  let component: ListcomplaintsComponent;
  let fixture: ComponentFixture<ListcomplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcomplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
