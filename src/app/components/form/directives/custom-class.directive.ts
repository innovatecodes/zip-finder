import { Directive } from '@angular/core';

@Directive({
  selector: '[customClass]',
  standalone: false,
  host: { class: 'shadow-none border-0 bg-input' },
})
export class CustomClassDirective {}
