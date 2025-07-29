import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LinkPreview } from 'app/modules/shared/types/post.types';
import { extractUrlFromText } from 'app/modules/shared/utils/url.utils';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LinkPreviewService {
  private http = inject(HttpClient);
  private endpoint = environment.apiUrl + 'link-preview';

  private _inputText = signal<string>('');
  private _isPreviewManuallyRemoved = signal<boolean>(false);
  private _manuallyRemovedUrl = signal<string>('');

  detectedUrl = computed(() => {
    const text = this._inputText();
    if (!text) return '';
    return extractUrlFromText(text);
  });

  shouldShowPreview = computed(() => {
    const url = this.detectedUrl();
    const isRemoved = this._isPreviewManuallyRemoved();
    const removedUrl = this._manuallyRemovedUrl();

    return url && (!isRemoved || removedUrl !== url);
  });

  private linkPreviewResource = rxResource({
    request: () => ({
      url: this.shouldShowPreview() ? this.detectedUrl() : '',
    }),
    loader: ({ request }) => {
      if (!request.url) return of(null);
      return this.fetchPreview(request.url);
    },
  });

  linkPreview = this.linkPreviewResource.value;
  isLoading = this.linkPreviewResource.isLoading;

  /**
   * Updates the input text and triggers URL detection
   */
  setInputText(text: string): void {
    this._inputText.set(text);

    if (!text || !this.detectedUrl()) {
      this._isPreviewManuallyRemoved.set(false);
      this._manuallyRemovedUrl.set('');
    }
  }

  /**
   * Manually removes the link preview
   */
  removeLinkPreview(): void {
    const currentUrl = this.detectedUrl();
    if (currentUrl) {
      this._manuallyRemovedUrl.set(currentUrl);
      this._isPreviewManuallyRemoved.set(true);
    }
  }

  /**
   * Private method to fetch preview data from API
   */
  private fetchPreview(url: string): Observable<LinkPreview | null> {
    const encodedUrl = encodeURIComponent(url);
    const params = `?url=${encodedUrl}`;

    return this.http.get<LinkPreview>(`${this.endpoint}${params}`).pipe(
      catchError(() => of(null)),
      map((response: LinkPreview | null) => {
        if (!response) return null;

        return {
          title: response.title,
          description: response.description,
          image: response.image,
          url: response.url || url,
        } as LinkPreview;
      })
    );
  }
}
