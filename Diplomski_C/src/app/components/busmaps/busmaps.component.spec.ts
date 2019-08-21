import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusmapsComponent } from './busmaps.component';

describe('BusmapsComponent', () => {
  let component: BusmapsComponent;
  let fixture: ComponentFixture<BusmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
