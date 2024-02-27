import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNutritionComponent } from './add-edit-nutrition.component';

describe('AddEditNutritionComponent', () => {
  let component: AddEditNutritionComponent;
  let fixture: ComponentFixture<AddEditNutritionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditNutritionComponent]
    });
    fixture = TestBed.createComponent(AddEditNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
