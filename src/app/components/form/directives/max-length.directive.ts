import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[attributeMaximumLength]',
  standalone: false,
})
export class MaxLengthDirective {
  @Input()
  attributeMaximumLength!: string | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const MAXLENGH_ATTR = 'maxlength';
    if ('attributeMaximumLength' in changes) {
      const attributeMaximumValue =
        changes['attributeMaximumLength'].currentValue;

      const hasValidValue =
        attributeMaximumValue !== '0' &&
        attributeMaximumValue !== null &&
        attributeMaximumValue !== '';

      if (!hasValidValue) {
        this.setRendererAttribute(this.el.nativeElement, MAXLENGH_ATTR);
      } else {
        this.setRendererAttribute(
          this.el.nativeElement,
          MAXLENGH_ATTR,
          attributeMaximumValue
        );
      }
    }
  }

  private setRendererAttribute(
    el: HTMLElement,
    maxlength: string,
    value?: string
  ): void {
    switch (value) {
      case undefined:
        this.renderer.removeAttribute(el, maxlength);
        break;
      default:
        this.renderer.setAttribute(el, maxlength, value);
        break;
    }
  }
}
