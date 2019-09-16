import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubpageComponent } from './user-subpage.component';

describe('UserSubpageComponent', () => {
  let component: UserSubpageComponent;
  let fixture: ComponentFixture<UserSubpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
