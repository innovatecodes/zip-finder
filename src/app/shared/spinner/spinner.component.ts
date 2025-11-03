import { Component, Input } from '@angular/core';

interface ISpinnerStyles {
  width: string;
  height: string;
  'border-width': string;
}

@Component({
  selector: 'app-spinner',
  standalone: false,
  template: `
    <div
      class="z-3"
      [ngClass]="{
        'position-fixed top-0 start-0 bottom-0 end-0 text-bg-secondary bg-opacity-50':
          !isSubmitted,
        'position-relative text-secondary': isSubmitted
      }"
    >
      <div
        class="d-flex align-items-center h-100 "
        [ngClass]="{
          'justify-content-center': !isSubmitted,
          'justify-content-start': isSubmitted
        }"
      >
        <div
          [ngStyle]="!isSubmitted ? spinnerOverlayStyles : spinnerInlineStyles"
          class="spinner-border"
          role="status"
        >
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input({ required: true }) isSubmitted!: boolean;

  public spinnerOverlayStyles: ISpinnerStyles = {
    width: '6rem',
    height: '6rem',
    'border-width': '1rem',
  };

  public spinnerInlineStyles: ISpinnerStyles = {
    width: '2rem',
    height: '2rem',
    'border-width': 'auto',
  };
}
