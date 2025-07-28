import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  LikeResponseDto,
  ToggleLikeResponse,
} from '../../shared/types/like.types';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private http = inject(HttpClient);

  toggleLike(postId: string): Observable<ToggleLikeResponse> {
    return this.http.post<ToggleLikeResponse>(
      this.getUrl(postId) + 'toggle-like',
      {}
    );
  }

  toggleLikeComment(
    postId: string,
    commentId: string
  ): Observable<ToggleLikeResponse> {
    return this.http.post<ToggleLikeResponse>(
      this.getUrl(postId) + `comments/` + commentId + '/toggle-like',
      {}
    );
  }

  getAllByPost(postId: string) {
    return this.http.get<LikeResponseDto[]>(this.getUrl(postId) + 'likes');
  }

  getAllByComment(postId: string, commentId: string) {
    return this.http.get<LikeResponseDto[]>(
      this.getUrl(postId) + `comments/` + commentId + 'likes'
    );
  }

  private getUrl(postId: string): string {
    return environment.apiUrl + `posts/${postId}/`;
  }
}
