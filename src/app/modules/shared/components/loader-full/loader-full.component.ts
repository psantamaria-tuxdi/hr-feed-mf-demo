import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'hr-loader-full',
  standalone: true,
  template: ` <div
    class="tw-bg-default tw-absolute tw-z-99 tw-grid tw-h-full tw-w-full tw-place-items-center"
  >
    <div class="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-text-center">
      <mat-progress-spinner
        [diameter]="48"
        [mode]="'indeterminate'"
      ></mat-progress-spinner>
      @if (text) {
        <span class="tw-text-lg tw-font-semibold">{{ text }}</span>
      }
    </div>
  </div>`,
  imports: [MatProgressSpinnerModule],
})
export class LoaderFullComponent {
  @Input() text = 'Cargando...';
}
