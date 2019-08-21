import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangeStationsComponent } from './add-change-stations.component';

describe('AddChangeStationsComponent', () => {
  let component: AddChangeStationsComponent;
  let fixture: ComponentFixture<AddChangeStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChangeStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangeStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
