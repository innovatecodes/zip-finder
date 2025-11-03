import { Component } from '@angular/core';

@Component({
  selector: 'app-debug-form',
  standalone: false,
  template: `<div class="bg-white mt-3">
    <ng-content></ng-content>
  </div>`,
  styles: `
  h2 {
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: border-box !important;
  }`,
})
export class DebugFormComponent {}
