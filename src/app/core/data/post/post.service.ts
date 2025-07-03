import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Post } from 'app/modules/shared/types/post.types';
import { environment } from 'environments/environment';
import { FeedParams } from './post.types';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private http = inject(HttpClient);
    private url = environment.apiUrl + 'posts/';

    getAll(params: FeedParams = {}) {
        return this.http.get<Post[]>(this.url + 'feed', { params });
    }
}
