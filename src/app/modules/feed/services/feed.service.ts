import { inject, Injectable, signal } from '@angular/core';
import { PostService } from 'app/modules/post/services/post.service';
import { CreatePostDto, Post } from '../../shared/types/post.types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FeedService {
    postService = inject(PostService);
    feed = signal<Post[] | null>(null);
    isLoading = signal<boolean>(true);

    load() {
        this.feed.set(null);
        this.isLoading.set(true);
        this.postService.getAll().subscribe((posts) => {
            this.feed.set(posts);
            this.isLoading.set(false);
        });
    }

    createPost(postData: CreatePostDto): Observable<Post> {
        return this.postService.create(postData);
    }
}
