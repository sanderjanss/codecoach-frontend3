import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeCardComponent } from './coachee-card.component';

describe('CoacheeCardComponent', () => {
  let component: CoacheeCardComponent;
  let fixture: ComponentFixture<CoacheeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoacheeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
