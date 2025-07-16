import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePostDto, Post } from 'app/modules/shared/types/post.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + 'posts/';

    getAll(params: { lastSeen?: string; pageSize?: number } = {}) {
        return this.http.get<Post[]>(this.url + 'feed', { params });
    }

    create(postData: CreatePostDto) {
        const formData = new FormData();
        formData.append('text', postData.text);

        if (postData.allowComments !== undefined) {
            formData.append('allowComments', postData.allowComments.toString());
        }

        if (postData.images?.length > 0) {
            postData.images.forEach((file) => {
                formData.append('images', file);
            });
        }

        return this.http.post<Post>(this.url, formData);
    }
}
