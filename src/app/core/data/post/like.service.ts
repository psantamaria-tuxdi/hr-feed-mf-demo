import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ToggleLikeResponse } from './post.types';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private http = inject(HttpClient);
    private url = (postId: string) => environment.apiUrl + `posts/${postId}/`;

    toggleLike(postId: string): Observable<ToggleLikeResponse> {
        return this.http.post<ToggleLikeResponse>(this.url(postId) + 'toggle-like', {});
    }
}
