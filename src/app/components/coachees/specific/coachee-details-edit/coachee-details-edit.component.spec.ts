import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoacheeDetailsEditComponent } from './coachee-details-edit.component';

describe('CoacheeDetailsComponent', () => {
  let component: CoacheeDetailsEditComponent;
  let fixture: ComponentFixture<CoacheeDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoacheeDetailsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoacheeDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
