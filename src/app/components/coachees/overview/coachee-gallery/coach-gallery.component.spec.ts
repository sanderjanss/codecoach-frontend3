import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachGalleryComponent } from './coach-gallery.component';

describe('CoacheeComponent', () => {
  let component: CoachGalleryComponent;
  let fixture: ComponentFixture<CoachGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
