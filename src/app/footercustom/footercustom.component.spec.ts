import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootercustomComponent } from './footercustom.component';

describe('FootercustomComponent', () => {
  let component: FootercustomComponent;
  let fixture: ComponentFixture<FootercustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootercustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootercustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
