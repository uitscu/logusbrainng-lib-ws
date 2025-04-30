import { FormGroup, FormControl, AbstractControl, ValidationErrors, ValidatorFn, FormArray } from "@angular/forms"
import { PatternValidators } from "./pattern.validators";
import { RegexConstants } from "../utils";

export function inputParamKey(text: any): boolean {
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_KEY);
  const req = PatternValidators.required(text);
  return pat && req;
}

export function inputNif(text: string): boolean {
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_NIF);
  const req = PatternValidators.required(text);
  return pat && req;
}

export function inputDateTime(date: any): boolean {
  const pat = PatternValidators.pattern(date, RegexConstants.INPUT_DATETIME);
  const req = PatternValidators.required(date);
  return pat && req;
}

export function inputAddress(text: string): boolean {
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_ADDRESS);
  const req = PatternValidators.required(text);
  return pat && req;
}

export function inputText(text: string): boolean {
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_TEXT);
  const req = PatternValidators.required(text);
  return pat && req;
}

export function inputTextMax(text: string, maxlength: number): boolean {
  const req = PatternValidators.required(text);
  const pat = PatternValidators.maxLength(text, maxlength);
  return pat && req;
}

export function inputEmail(text: string): boolean {
  const req = PatternValidators.required(text);
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_EMAIL);
  return req && pat;
}

export function inputPhone(text: string): boolean {
  const req = PatternValidators.required(text);
  const pat = PatternValidators.pattern(text, RegexConstants.INPUT_PHONE);
  return req && pat;
}

export function matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    let parent = control.parent;

    if (parent instanceof FormArray && control.parent?.parent instanceof FormGroup) {
      parent = control.parent.parent;
    }

    const matchControl = (parent instanceof FormGroup) ? parent.controls[matchTo] : null;

    if (!matchControl) return null;

    return control.value === matchControl.value ? null : { isMatching: false };
  };
}

export function validateFormControls(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field)

    if (control instanceof FormControl) {
      control.markAsDirty({ onlySelf: true })
    } else if (control instanceof FormGroup) {
      validateFormControls(control)
    }
  })
}
