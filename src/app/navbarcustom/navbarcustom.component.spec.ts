import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarcustomComponent } from './navbarcustom.component';

describe('NavbarcustomComponent', () => {
  let component: NavbarcustomComponent;
  let fixture: ComponentFixture<NavbarcustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarcustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarcustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
