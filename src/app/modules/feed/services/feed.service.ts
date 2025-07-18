import { inject, Injectable, signal } from '@angular/core';
import { PostService } from 'app/modules/post/services/post.service';
import { finalize, Observable } from 'rxjs';
import { CreatePostDto, Post } from '../../shared/types/post.types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class FeedService {
    private snackBar = inject(MatSnackBar);
    postService = inject(PostService);

    feed = signal<Post[]>([]);
    isLoading = signal<boolean>(false);
    hasMore = signal<boolean>(false);

    pageSize = 10;

    load() {
        this.feed.set([]);
        this.hasMore.set(true);
        this.fetchMore();
    }

    fetchMore() {
        if (this.isLoading()) {
            console.log('Already loading posts, skipping fetchMore call.');
            return;
        }

        this.isLoading.set(true);
        const feed = this.feed();
        const lastSeen = feed.length
            ? feed[feed.length - 1].createdAt
            : undefined;
        const params = lastSeen
            ? { lastSeen, pageSize: this.pageSize }
            : { pageSize: this.pageSize };

        this.postService
            .getAll(params)
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe({
                next: (posts) => {
                    this.feed.update((v) => [...v, ...posts]);
                    this.hasMore.set(posts.length === this.pageSize);
                },
                error: (error) => {
                    this.showSnackBar('Error al cargar publicaciones');
                    console.error('Error loading posts:', error);
                },
            });
    }

    createPost(postData: CreatePostDto): Observable<Post> {
        return this.postService.create(postData);
    }

    // TODO: migrate to a snackbar service
    // For now, using MatSnackBar directly
    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
        });
    }
}
