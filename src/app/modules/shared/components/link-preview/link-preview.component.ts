import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LinkPreviewService } from '../../services/link-preview.service';
import { LinkPreview } from '../../types/post.types';

@Component({
  selector: 'hr-link-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './link-preview.component.html',
})
export class LinkPreviewComponent implements OnDestroy {
  private linkPreviewService = inject(LinkPreviewService);
  private destroy$ = new Subject<void>();

  url = input.required<string>();
  showRemoveButton = input<boolean>(false);
  linkPreviewData = input<LinkPreview | null>(null);

  onRemove = output<void>();

  private _linkPreview = signal<LinkPreview | null>(null);
  private _isLoading = signal<boolean>(false);

  linkPreview = computed(() => {
    const inputData = this.linkPreviewData();
    return inputData || this._linkPreview();
  });

  isLoading = computed(() => this._isLoading());

  constructor() {
    // Effect to load preview when URL changes and no preview data is provided
    effect(() => {
      const url = this.url();
      const existingData = this.linkPreviewData();

      if (url && !existingData) {
        this.loadLinkPreview(url);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadLinkPreview(url: string): void {
    this._isLoading.set(true);
    this._linkPreview.set(null);

    this.linkPreviewService
      .getPreview(url)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this._isLoading.set(false))
      )
      .subscribe({
        next: (data) => {
          this._linkPreview.set(data);
        },
        error: () => {
          this._linkPreview.set(null);
        },
      });
  }

  removeLinkPreview(): void {
    this.onRemove.emit();
  }
}
