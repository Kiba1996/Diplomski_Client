import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAdminContComponent } from './reg-admin-cont.component';

describe('RegAdminContComponent', () => {
  let component: RegAdminContComponent;
  let fixture: ComponentFixture<RegAdminContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegAdminContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAdminContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
