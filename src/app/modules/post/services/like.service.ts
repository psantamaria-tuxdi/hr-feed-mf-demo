import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ToggleLikeResponse } from '../../shared/types/like.types';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private http = inject(HttpClient);

    toggleLike(postId: string): Observable<ToggleLikeResponse> {
        return this.http.post<ToggleLikeResponse>(this.getUrl(postId) + 'toggle-like', {});
    }

    private getUrl(postId: string): string {
        return environment.apiUrl + `posts/${postId}/`;
    }
}
