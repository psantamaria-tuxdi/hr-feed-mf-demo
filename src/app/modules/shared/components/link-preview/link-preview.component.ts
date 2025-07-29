import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LinkPreviewService } from '../../services/link-preview.service';
import { LinkPreview } from '../../types/post.types';

@Component({
  selector: 'hr-link-preview',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './link-preview.component.html',
})
export class LinkPreviewComponent {
  private linkPreviewService = inject(LinkPreviewService);

  showRemoveButton = input<boolean>(false);
  linkPreviewData = input<LinkPreview | null>(null);

  linkPreview = computed(() => {
    const inputData = this.linkPreviewData();
    return inputData || this.linkPreviewService.linkPreview();
  });

  isLoading = computed(() => {
    return !this.linkPreviewData() && this.linkPreviewService.isLoading();
  });

  removeLinkPreview(): void {
    this.linkPreviewService.removeLinkPreview();
  }
}
