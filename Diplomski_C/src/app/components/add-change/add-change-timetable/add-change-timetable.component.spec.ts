import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangeTimetableComponent } from './add-change-timetable.component';

describe('AddChangeTimetableComponent', () => {
  let component: AddChangeTimetableComponent;
  let fixture: ComponentFixture<AddChangeTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChangeTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangeTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
