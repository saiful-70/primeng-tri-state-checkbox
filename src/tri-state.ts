/**
 * Utility function to cycle through tri-state values: null -> true -> false -> null
 * @param currentValue - The current boolean or null value
 * @returns The next value in the tri-state cycle
 */
export function cycleTriState(currentValue: boolean | null): boolean | null {
  if (currentValue === null) return true;
  if (currentValue === true) return false;
  return null;
}

/**
 * Type definition for Angular FormControl with tri-state boolean values
 */
export interface TriStateFormControl {
  value: boolean | null;
  setValue(value: boolean | null): void;
}

/**
 * Universal tri-state function that can cycle values or update FormControls
 * @param input - Either a FormControl to update or a boolean/null value to cycle
 * @returns If input is a value, returns the next tri-state value. If input is FormControl, updates it and returns void.
 * 
 * @example
 *   ```typescript
 *   onTriStateChange(control: any): void {
 *     turnToTriState(control);
 *   }
 *   ```
 *
 *   ```html
 *   <p-checkbox
 *     [value]="form.controls.isActive.value"
 *     inputId="isActive"
 *     name="isActive"
 *     [indeterminate]="form.controls.isActive.value === null"
 *     [binary]="true"
 *     (onChange)="onTriStateChange(form.controls.isActive)" />
 *   ```
 */
export function turnToTriState<T extends TriStateFormControl | boolean | null>(
  input: T
): T extends TriStateFormControl ? void : boolean | null {
  // Check if input has setValue method (FormControl)
  if (input && typeof input === 'object' && 'setValue' in input && 'value' in input) {
    const formControl = input as TriStateFormControl;
    formControl.setValue(cycleTriState(formControl.value));
    return undefined as T extends TriStateFormControl ? void : boolean | null;
  }
  
  // Otherwise treat as a direct value
  return cycleTriState(input as boolean | null) as T extends TriStateFormControl ? void : boolean | null;
}

/**
 * Returns the display state for PrimeNG tri-state checkbox
 * @param value - The current tri-state value
 * @returns Object with value and indeterminate properties for PrimeNG p-checkbox
 */
export function getPrimeNGTriStateProps(value: boolean | null): { 
  value: boolean | null; 
  indeterminate: boolean;
  binary: boolean;
} {
  return {
    value: value,
    indeterminate: value === null,
    binary: true
  };
}

/**
 * Returns the display state for tri-state checkbox
 * @param value - The current tri-state value
 * @returns Object with checked and indeterminate properties
 */
export function getTriStateDisplay(value: boolean | null): { checked: boolean; indeterminate: boolean } {
  return {
    checked: value === true,
    indeterminate: value === null
  };
}

/**
 * Converts a tri-state value to a string representation
 * @param value - The tri-state value
 * @returns String representation of the state
 */
export function triStateToString(value: boolean | null): 'true' | 'false' | 'null' {
  if (value === null) return 'null';
  return value ? 'true' : 'false';
}

/**
 * Parses a string to tri-state value
 * @param value - String representation of tri-state
 * @returns The tri-state boolean value
 */
export function stringToTriState(value: string): boolean | null {
  if (value === 'null' || value === '') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return null;
}

/**
 * Gets Tailwind CSS classes for tri-state visual feedback
 * @param value - The current tri-state value
 * @param customClasses - Optional custom classes for each state
 * @returns CSS classes string
 */
export function getTriStateTailwindClasses(
  value: boolean | null,
  customClasses?: {
    null?: string;
    true?: string;
    false?: string;
  }
): string {
  const defaultClasses = {
    null: 'text-yellow-600 bg-yellow-50 border-yellow-300',
    true: 'text-green-600 bg-green-50 border-green-300',
    false: 'text-red-600 bg-red-50 border-red-300'
  };

  const classes = { ...defaultClasses, ...customClasses };

  if (value === null) return classes.null || '';
  if (value === true) return classes.true || '';
  return classes.false || '';
}

/**
 * Returns an icon class name based on tri-state value (for use with PrimeNG icons)
 * @param value - The current tri-state value
 * @param iconSet - Icon set to use ('pi' for PrimeIcons, 'fa' for FontAwesome)
 * @returns Icon class string
 */
export function getTriStateIcon(
  value: boolean | null,
  iconSet: 'pi' | 'fa' = 'pi'
): string {
  if (iconSet === 'pi') {
    if (value === null) return 'pi pi-minus';
    if (value === true) return 'pi pi-check';
    return 'pi pi-times';
  } else {
    if (value === null) return 'fa fa-minus';
    if (value === true) return 'fa fa-check';
    return 'fa fa-times';
  }
}
