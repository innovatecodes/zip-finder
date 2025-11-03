import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugFormComponent } from './debug-form';
import { SpinnerComponent } from './spinner';

@NgModule({
  declarations: [DebugFormComponent, SpinnerComponent],
  imports: [CommonModule],
  exports: [DebugFormComponent, SpinnerComponent],
})
export class SharedModule {}
