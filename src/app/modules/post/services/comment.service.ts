import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Comment,
  CreateCommentDto,
} from 'app/modules/shared/types/comment.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly http = inject(HttpClient);

  getAll(postId: string) {
    return this.http.get<Comment[]>(this.getUrl(postId));
  }

  create(postId: string, commentDto: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>(this.getUrl(postId), commentDto);
  }

  private getUrl(postId: string): string {
    return environment.apiUrl + `posts/${postId}/comments/`;
  }
}
