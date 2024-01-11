import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarouselComponent } from './edit-carousel.component';

describe('EditCarouselComponent', () => {
  let component: EditCarouselComponent;
  let fixture: ComponentFixture<EditCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarouselComponent]
    });
    fixture = TestBed.createComponent(EditCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
