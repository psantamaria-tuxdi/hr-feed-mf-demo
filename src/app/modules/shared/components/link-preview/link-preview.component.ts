import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { LinkPreviewService } from '../../services/link-preview.service';

@Component({
  selector: 'hr-link-preview',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './link-preview.component.html',
})
export class LinkPreviewComponent {
  private linkPreviewService = inject(LinkPreviewService);

  url = input.required<string>();
  showRemoveButton = input<boolean>(false);

  previewRemoved = output<void>();

  private _isPreviewManuallyRemoved = signal(false);

  shouldFetchPreview = computed(() => {
    const url = this.url();
    return url && !this._isPreviewManuallyRemoved();
  });

  private linkPreviewResource = rxResource({
    request: () => ({
      url: this.shouldFetchPreview() ? this.url() : '',
    }),
    loader: ({ request }) => {
      if (!request.url) return of(null);
      return this.linkPreviewService.fetchPreview(request.url);
    },
  });

  linkPreview = this.linkPreviewResource.value;
  isLoading = this.linkPreviewResource.isLoading;

  hasPreview = computed(() => {
    return !!this.linkPreview() && this.shouldFetchPreview();
  });

  removeLinkPreview(): void {
    this._isPreviewManuallyRemoved.set(true);
    this.previewRemoved.emit();
  }

  handleCardClick(): void {
    if (!this.showRemoveButton()) {
      this.openLink();
    }
  }

  openLink(): void {
    const url = this.linkPreview()?.url;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
