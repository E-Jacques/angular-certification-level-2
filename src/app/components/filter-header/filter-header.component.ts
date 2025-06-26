import { Component, EventEmitter, Input, OnChanges, output, Output, OutputEmitterRef, SimpleChanges } from '@angular/core';
import { CocktailFilter } from '../../@types/internal/filter';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-filter-header',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './filter-header.component.html',
  styleUrl: './filter-header.component.scss'
})
/**
 * A styled header component that includes a filter input.
 * 
 * @example
 * ```typescript
 * <app-filter-header [(value)]="filterValue"></app-filter-header>
 * ```
 */
export class FilterHeaderComponent {
  /**
   * The placeholder text for the filter input.
   */
  public readonly filterChange: OutputEmitterRef<CocktailFilter> = output<CocktailFilter>();

  /**
   * The form group used to handle filters. Default values should be provided by the input filter.
   */
  public form = new FormGroup({
    name: new FormControl('', { updateOn: 'change', nonNullable: true })
  });

  constructor() {
    this.form.valueChanges.subscribe(value => {
      this.filterChange.emit(value);
    });
  }
}