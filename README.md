# primeng-tri-state-checkbox

A TypeScript utility library for tri-state checkbox functionality in Angular applications, specifically designed for PrimeNG 19+ and optimized for Tailwind CSS.

## Features

- 🔄 **Tri-state cycling**: null → true → false → null
- 🎨 **PrimeNG integration**: Built specifically for PrimeNG p-checkbox component
- 🎯 **TypeScript support**: Full type safety and IntelliSense
- 🎨 **Tailwind CSS utilities**: Pre-built classes for visual feedback
- 📦 **Tree-shakeable**: Import only what you need
- 🚀 **Zero dependencies**: Lightweight and fast

## Installation

```bash
npm install primeng-tri-state-checkbox
```

## Peer Dependencies

```bash
npm install @angular/forms primeng
```

## Basic Usage

### 1. Simple Import - One Function for Everything

```typescript
import { turnToTriState } from 'primeng-tri-state-checkbox';
import { FormControl } from '@angular/forms';

// Create a form control with tri-state value
const formControl = new FormControl<boolean | null>(null);

// Use with form control directly - it will cycle the control's value
turnToTriState(formControl); // null → true → false → null

// Or use with direct values - it returns the next state
let currentValue: boolean | null = null;
currentValue = turnToTriState(currentValue); // returns true
currentValue = turnToTriState(currentValue); // returns false
currentValue = turnToTriState(currentValue); // returns null
```

### 2. Advanced Usage with Multiple Functions

```typescript
import { 
  turnToTriState, 
  cycleTriState,
  getPrimeNGTriStateProps 
} from 'primeng-tri-state-checkbox';

// If you need more specific control, you can still use individual functions
const nextValue = cycleTriState(currentValue);
const primeNGProps = getPrimeNGTriStateProps(currentValue);
```

### 3. PrimeNG Integration

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { turnToTriState } from 'primeng-tri-state-checkbox';

@Component({
  selector: 'app-example',
  template: `
    <form [formGroup]="form">
      <div class="flex items-center gap-2">
        <p-checkbox
          [value]="form.controls.hasFusing.value"
          inputId="hasFusing"
          name="hasFusing"
          [indeterminate]="form.controls.hasFusing.value === null"
          [binary]="true"
          (onChange)="turnToTriState(form.controls.hasFusing)" />
        <label class="whitespace-nowrap text-sm" for="hasFusing">
          Has Fusing?
        </label>
      </div>
    </form>
  `
})
export class ExampleComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      hasFusing: [null] // Start with indeterminate state
    });
  }

  // Make turnToTriState available in template
  turnToTriState = turnToTriState;
}
```

## API Reference

### Core Functions

#### `cycleTriState(currentValue: boolean | null): boolean | null`
Cycles through tri-state values: null → true → false → null

#### `turnToTriState(formControl: TriStateFormControl): void`
Cycles a FormControl through tri-state values

### PrimeNG Utilities

#### `getPrimeNGTriStateProps(value: boolean | null)`
Returns props object for PrimeNG p-checkbox:
```typescript
{
  value: boolean | null;
  indeterminate: boolean;
  binary: boolean;
}
```

#### `handlePrimeNGTriStateChange(event: any, formControl: TriStateFormControl): void`
Event handler for PrimeNG onChange events

#### `generatePrimeNGTriStateTemplate(fieldName: string, config?: object): string`
Generates complete HTML template for PrimeNG tri-state checkbox

### Tailwind CSS Utilities

#### `getTriStateTailwindClasses(value: boolean | null, customClasses?: object): string`
Returns Tailwind CSS classes for visual feedback:
- `null`: yellow theme (unknown/indeterminate)
- `true`: green theme (positive)
- `false`: red theme (negative)

#### `getTriStateIcon(value: boolean | null, iconSet?: 'pi' | 'fa'): string`
Returns icon classes for tri-state representation:
- `null`: minus icon
- `true`: check icon  
- `false`: times/x icon

### Display Utilities

#### `triStateToString(value: boolean | null): 'true' | 'false' | 'null'`
Converts tri-state value to string

#### `stringToTriState(value: string): boolean | null`
Parses string to tri-state value

#### `getTriStateLabel(value: boolean | null, labels?: object): string`
Returns human-readable labels for each state

## Advanced Examples

### Custom Styling with Tailwind

```typescript
import { getTriStateTailwindClasses, getTriStateIcon } from 'primeng-tri-state-checkbox';

@Component({
  template: `
    <div [class]="getStateClasses(form.controls.status.value)" 
         class="p-3 rounded-lg border">
      <i [class]="getStateIcon(form.controls.status.value)" class="mr-2"></i>
      {{ getStateLabel(form.controls.status.value) }}
    </div>
  `
})
export class CustomStyledComponent {
  getStateClasses(value: boolean | null): string {
    return getTriStateTailwindClasses(value, {
      null: 'bg-gray-100 border-gray-300 text-gray-700',
      true: 'bg-emerald-50 border-emerald-300 text-emerald-700',
      false: 'bg-rose-50 border-rose-300 text-rose-700'
    });
  }

  getStateIcon(value: boolean | null): string {
    return getTriStateIcon(value, 'pi');
  }
}
```

### Multiple Tri-state Checkboxes

```typescript
@Component({
  template: `
    <form [formGroup]="form" class="space-y-4">
      <div *ngFor="let field of triStateFields" 
           class="flex items-center gap-2">
        <p-checkbox
          [value]="form.controls[field.key].value"
          [inputId]="field.key"
          [name]="field.key"
          [indeterminate]="form.controls[field.key].value === null"
          [binary]="true"
          (onChange)="turnToTriState(form.controls[field.key])" />
        <label class="text-sm" [for]="field.key">
          {{ field.label }}
        </label>
        <span [class]="getTriStateTailwindClasses(form.controls[field.key].value)"
              class="px-2 py-1 rounded text-xs">
          {{ getTriStateLabel(form.controls[field.key].value) }}
        </span>
      </div>
    </form>
  `
})
export class MultiTriStateComponent {
  triStateFields = [
    { key: 'hasWarranty', label: 'Has Warranty?' },
    { key: 'isActive', label: 'Is Active?' },
    { key: 'isVerified', label: 'Is Verified?' }
  ];

  form = this.fb.group({
    hasWarranty: [null],
    isActive: [null], 
    isVerified: [null]
  });

  turnToTriState = turnToTriState;
  getTriStateTailwindClasses = getTriStateTailwindClasses;
  getTriStateLabel = getTriStateLabel;
}
```

## TypeScript Types

```typescript
interface TriStateFormControl {
  value: boolean | null;
  setValue(value: boolean | null): void;
}

type TriStateValue = boolean | null;
type TriStateString = 'true' | 'false' | 'null';
```

## Browser Support

- Modern browsers supporting ES2020+
- Angular 19+
- PrimeNG 19+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License. See LICENSE file for details.

## Links

- [PrimeNG Documentation](https://primeng.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
