import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyATicketComponent } from './buy-a-ticket.component';

describe('BuyATicketComponent', () => {
  let component: BuyATicketComponent;
  let fixture: ComponentFixture<BuyATicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyATicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyATicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
