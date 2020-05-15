import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntercomplaintComponent } from './entercomplaint.component';

describe('EntercomplaintComponent', () => {
  let component: EntercomplaintComponent;
  let fixture: ComponentFixture<EntercomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntercomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntercomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
