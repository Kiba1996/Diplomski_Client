import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangePricelistComponent } from './add-change-pricelist.component';

describe('AddChangePricelistComponent', () => {
  let component: AddChangePricelistComponent;
  let fixture: ComponentFixture<AddChangePricelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChangePricelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangePricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
