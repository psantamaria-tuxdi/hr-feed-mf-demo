import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LinkPreview } from 'app/modules/shared/types/post.types';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LinkPreviewService {
  private http = inject(HttpClient);
  private endpoint = environment.apiUrl + 'link-preview';

  /**
   * Fetches preview data from API for a given URL
   * @param url - The URL to fetch preview for
   * @returns Observable with LinkPreview data or null if failed
   */
  fetchPreview(url: string): Observable<LinkPreview | null> {
    const params = new HttpParams().set('url', url);

    return this.http.get<LinkPreview>(this.endpoint, { params }).pipe(
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
