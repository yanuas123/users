import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSubpageComponent } from './address-subpage.component';

describe('AddressSubpageComponent', () => {
  let component: AddressSubpageComponent;
  let fixture: ComponentFixture<AddressSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
