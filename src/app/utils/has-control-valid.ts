import { NgForm } from '@angular/forms';

export function hasControlValid(control: NgForm): boolean {
  return !!(control.dirty && control.touched && control.valid);
}
