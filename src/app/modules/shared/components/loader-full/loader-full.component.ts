import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'hr-loader-full',
  standalone: true,
  template: ` <div
    class="tw-absolute tw-z-99 tw-w-full tw-h-full tw-grid tw-place-items-center tw-bg-default"
  >
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-text-center">
      <mat-progress-spinner [diameter]="48" [mode]="'indeterminate'"></mat-progress-spinner>
      @if (text) {
        <span class="tw-font-semibold tw-text-lg">{{ text }}</span>
      }
    </div>
  </div>`,
  imports: [MatProgressSpinnerModule],
})
export class LoaderFullComponent {
  @Input() text = 'Cargando...';
}
