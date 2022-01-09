import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCoacheeComponent } from './specific-coachee.component';

describe('SpecCoacheeComponent', () => {
  let component: SpecificCoacheeComponent;
  let fixture: ComponentFixture<SpecificCoacheeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificCoacheeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificCoacheeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
