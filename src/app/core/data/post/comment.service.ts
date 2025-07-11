import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from 'app/modules/shared/types/comment.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CreateCommentDto } from './post.types';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private http = inject(HttpClient);
    private url = (postId: string) => environment.apiUrl + `posts/${postId}/comments/`;

    getAll(postId: string) {
        return this.http.get<Comment[]>(this.url(postId));
    }

    post(postId: string, commentDto: CreateCommentDto): Observable<Comment> {
        return this.http.post<Comment>(this.url(postId), commentDto);
    }
}
