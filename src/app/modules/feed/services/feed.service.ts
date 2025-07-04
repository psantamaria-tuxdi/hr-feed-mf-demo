import { inject, Injectable, signal } from '@angular/core';
import { PostService } from 'app/core/data/post/post.service';
import { Post } from '../../shared/types/post.types';
import { CreatePostDto } from 'app/core/data/post/post.types';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

    createPost(postData: CreatePostDto): Observable<any> {
        return this.postService.create(postData).pipe(
            tap(() => {
                this.load();
            })
        );
    }
}
