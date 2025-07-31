import { cycleTriState, TriStateFormControl } from './tri-state';

/**
 * PrimeNG-specific tri-state checkbox utilities
 */

/**
 * Event handler for PrimeNG p-checkbox onChange event
 * @param event - The PrimeNG checkbox change event
 * @param formControl - The FormControl to update
 */
export function handlePrimeNGTriStateChange(
  event: any,
  formControl: TriStateFormControl
): void {
  // PrimeNG checkbox onChange event provides the new value
  const newValue = event.checked;
  
  // If it's a tri-state checkbox, we need to cycle through the states
  if (formControl.value === null && newValue === true) {
    formControl.setValue(true);
  } else if (formControl.value === true && newValue === false) {
    formControl.setValue(false);
  } else if (formControl.value === false && newValue === false) {
    formControl.setValue(null);
  } else {
    // Fallback to cycling
    formControl.setValue(cycleTriState(formControl.value));
  }
}

/**
 * Returns PrimeNG template configuration for tri-state checkbox
 * @param value - Current tri-state value
 * @param inputId - HTML input ID
 * @param name - Input name attribute
 * @returns Configuration object for PrimeNG p-checkbox
 */
export function getPrimeNGTriStateConfig(
  value: boolean | null,
  inputId: string,
  name: string
) {
  return {
    value: value,
    inputId: inputId,
    name: name,
    indeterminate: value === null,
    binary: true
  };
}

/**
 * Returns the label text based on tri-state value
 * @param value - Current tri-state value
 * @param labels - Custom labels for each state
 * @returns Label text
 */
export function getTriStateLabel(
  value: boolean | null,
  labels?: {
    null?: string;
    true?: string;
    false?: string;
  }
): string {
  const defaultLabels = {
    null: 'Unknown',
    true: 'Yes',
    false: 'No'
  };

  const finalLabels = { ...defaultLabels, ...labels };

  if (value === null) return finalLabels.null || '';
  if (value === true) return finalLabels.true || '';
  return finalLabels.false || '';
}

/**
 * Generates a complete PrimeNG checkbox template string
 * @param fieldName - Form control field name
 * @param config - Configuration options
 * @returns HTML template string for PrimeNG checkbox
 */
export function generatePrimeNGTriStateTemplate(
  fieldName: string,
  config: {
    label?: string;
    inputId?: string;
    name?: string;
    containerClasses?: string;
    labelClasses?: string;
  } = {}
): string {
  const inputId = config.inputId || fieldName;
  const name = config.name || fieldName;
  const label = config.label || `Has ${fieldName}?`;
  const containerClasses = config.containerClasses || 'flex items-center gap-2';
  const labelClasses = config.labelClasses || 'whitespace-nowrap text-sm';

  return `
<div class="${containerClasses}">
  <p-checkbox
    [value]="form.controls.${fieldName}.value"
    inputId="${inputId}"
    name="${name}"
    [indeterminate]="form.controls.${fieldName}.value === null"
    [binary]="true"
    (onChange)="turnToTriState(form.controls.${fieldName})" />
  <label class="${labelClasses}" for="${inputId}">
    ${label}
  </label>
</div>`.trim();
}
