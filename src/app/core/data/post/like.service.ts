import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from 'app/modules/shared/types/post.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    private http = inject(HttpClient);
    private url = (postId: string) => environment.apiUrl + `posts/${postId}/`;

    toggleLike(postId: string) {
        return this.http.post<Post[]>(this.url(postId) + 'toggle-like', {});
    }
}
