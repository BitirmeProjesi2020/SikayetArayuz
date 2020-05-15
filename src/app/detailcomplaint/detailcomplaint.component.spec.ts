import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcomplaintComponent } from './detailcomplaint.component';

describe('DetailcomplaintComponent', () => {
  let component: DetailcomplaintComponent;
  let fixture: ComponentFixture<DetailcomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
