import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCoachComponent } from './request-coach.component';

describe('RequestCoachComponent', () => {
  let component: RequestCoachComponent;
  let fixture: ComponentFixture<RequestCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
