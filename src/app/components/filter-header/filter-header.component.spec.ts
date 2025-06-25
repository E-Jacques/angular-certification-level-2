import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeaderComponent } from './filter-header.component';
import { By } from '@angular/platform-browser';

describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should use an empty string as default value', () => {
    const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('[data-testid="cocktail-name-input"]')).nativeElement;
    expect(inputElement.value).toBe('');
  });

  it("should emit the filterChange event when the filter changes", () => {
    spyOn(component.filterChange, 'emit');
    component.form.setValue({
      name: "new-value"
    })

    expect(component.filterChange.emit).toHaveBeenCalledWith({ name: 'new-value' });
  });
});
