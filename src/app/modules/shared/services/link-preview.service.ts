import { HttpClient } from '@angular/common/http';
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

  getPreview(url: string): Observable<LinkPreview | null> {
    const encodedUrl = encodeURIComponent(url);
    const params = `?url=${encodedUrl}`;
    return this.http
      .get<LinkPreview>(`${this.endpoint}${params}`)
      .pipe(
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
