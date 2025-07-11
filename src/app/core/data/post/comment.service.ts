import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from 'app/modules/shared/types/comment.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private http = inject(HttpClient);
    private url = (postId: string) => environment.apiUrl + `posts/${postId}/comments/`;

    getAll(postId: string) {
        return this.http.get<Comment[]>(this.url(postId));
    }
}
