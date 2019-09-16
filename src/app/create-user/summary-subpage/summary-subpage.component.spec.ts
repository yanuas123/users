import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySubpageComponent } from './summary-subpage.component';

describe('SummarySubpageComponent', () => {
  let component: SummarySubpageComponent;
  let fixture: ComponentFixture<SummarySubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarySubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
