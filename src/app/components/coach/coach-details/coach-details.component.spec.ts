import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeDetailsComponent } from './coach-details.component';

describe('CoacheeDetailsComponent', () => {
  let component: CoacheeDetailsComponent;
  let fixture: ComponentFixture<CoacheeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoacheeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
