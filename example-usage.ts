// @ts-nocheck
/**
 * Example usage of primeng-tri-state-checkbox
 * This file demonstrates how to use the tri-state checkbox utilities
 * in an Angular component with PrimeNG and Tailwind CSS
 * 
 * NOTE: This is an example file only. The imports will show errors
 * since Angular dependencies are not installed in this library package.
 * This file is for documentation purposes and is excluded from compilation.
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { 
  turnToTriState,
  getPrimeNGTriStateProps,
  getTriStateTailwindClasses,
  getTriStateIcon,
  getTriStateLabel
} from 'primeng-tri-state-checkbox';

@Component({
  selector: 'app-tri-state-example',
  template: `
    <div class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4">Tri-State Checkbox Example</h2>
      
      <form [formGroup]="form" class="space-y-4">
        <!-- Basic tri-state checkbox -->
        <div class="flex items-center gap-2">
          <p-checkbox
            [value]="form.controls.hasFusing.value"
            inputId="hasFusing"
            name="hasFusing"
            [indeterminate]="form.controls.hasFusing.value === null"
            [binary]="true"
            (onChange)="onTriStateChange(form.controls.hasFusing)" />
          <label class="whitespace-nowrap text-sm" for="hasFusing">
            Has Fusing?
          </label>
        </div>

        <!-- Tri-state with visual feedback -->
        <div class="flex items-center gap-2">
          <p-checkbox
            [value]="form.controls.isVerified.value"
            inputId="isVerified"
            name="isVerified"
            [indeterminate]="form.controls.isVerified.value === null"
            [binary]="true"
            (onChange)="onTriStateChange(form.controls.isVerified)" />
          <label class="text-sm" for="isVerified">Is Verified?</label>
          <span [class]="getStateClasses(form.controls.isVerified.value)"
                class="px-2 py-1 rounded text-xs flex items-center gap-1">
            <i [class]="getStateIcon(form.controls.isVerified.value)"></i>
            {{ getStateLabel(form.controls.isVerified.value) }}
          </span>
        </div>

        <!-- Multiple tri-state fields -->
        <div class="border-t pt-4">
          <h3 class="font-medium mb-2">Multiple Options</h3>
          <div class="space-y-2">
            <div *ngFor="let field of triStateFields" 
                 class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <p-checkbox
                  [value]="form.controls[field.key].value"
                  [inputId]="field.key"
                  [name]="field.key"
                  [indeterminate]="form.controls[field.key].value === null"
                  [binary]="true"
                  (onChange)="onTriStateChange(form.controls[field.key])" />
                <label class="text-sm" [for]="field.key">
                  {{ field.label }}
                </label>
              </div>
              <span [class]="getStateClasses(form.controls[field.key].value)"
                    class="px-2 py-1 rounded text-xs">
                {{ getStateLabel(form.controls[field.key].value) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form state display -->
        <div class="border-t pt-4">
          <h3 class="font-medium mb-2">Current Form State</h3>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">{{ getFormState() }}</pre>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-2 pt-4">
          <button type="button" 
                  (click)="onCycleAllStates()"
                  class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
            Cycle All
          </button>
          <button type="button" 
                  (click)="resetAllStates()"
                  class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
            Reset All
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
    }
  `]
})
export class TriStateExampleComponent {
  form: FormGroup;

  triStateFields = [
    { key: 'hasWarranty', label: 'Has Warranty?' },
    { key: 'isActive', label: 'Is Active?' },
    { key: 'isPublic', label: 'Is Public?' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      hasFusing: [null],
      isVerified: [null],
      hasWarranty: [null],
      isActive: [null],
      isPublic: [null]
    });
  }

  // Method to handle tri-state changes
  onTriStateChange(control: any): void {
    turnToTriState(control);
  }

  getStateClasses(value: boolean | null): string {
    return getTriStateTailwindClasses(value, {
      null: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      true: 'bg-green-100 border-green-300 text-green-800',
      false: 'bg-red-100 border-red-300 text-red-800'
    });
  }

  getStateIcon(value: boolean | null): string {
    return getTriStateIcon(value, 'pi');
  }

  getStateLabel(value: boolean | null): string {
    return getTriStateLabel(value, {
      null: 'Unknown',
      true: 'Yes',
      false: 'No'
    });
  }

  cycleAllStates(): void {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.controls[key];
      // Use turnToTriState with FormControl - it will cycle the control's value
      turnToTriState(control);
    });
  }

  onCycleAllStates(): void {
    this.cycleAllStates();
  }

  // Example of using turnToTriState with direct values
  getNextStateExample(currentValue: boolean | null): boolean | null {
    // Use turnToTriState with a direct value - it returns the next state
    return turnToTriState(currentValue);
  }

  resetAllStates(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(null);
    });
  }

  getFormState(): string {
    const formValue = this.form.value;
    return JSON.stringify(formValue, null, 2);
  }
}

/**
 * Usage in your Angular module:
 * 
 * import { ReactiveFormsModule } from '@angular/forms';
 * import { CheckboxModule } from 'primeng/checkbox';
 * 
 * @NgModule({
 *   imports: [
 *     ReactiveFormsModule,
 *     CheckboxModule,
 *     // ... other imports
 *   ],
 *   declarations: [
 *     TriStateExampleComponent,
 *     // ... other components
 *   ]
 * })
 * export class YourModule { }
 */
