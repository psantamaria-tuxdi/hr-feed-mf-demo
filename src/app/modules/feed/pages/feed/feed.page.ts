import { Component, signal } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { Post } from '../../../shared/types/post.types';
import { postsMock } from '../../components/post/post.mock';
import { LoaderFullComponent } from 'app/modules/shared/components/loader-full/loader-full.component';

@Component({
    selector: 'hr-feed-page',
    templateUrl: './feed.page.html',
    imports: [PostComponent, CreatePostComponent, LoaderFullComponent],
})
export class FeedPage {
    // TODO: Replace with real user data
    posts = signal<Post[]>(postsMock);
    isLoading = signal<boolean>(true);

    ngOnInit() {
        setTimeout(() => {
            this.isLoading.set(false);
        }, 2000);
    }

    /**
     * Constructor
     */
    constructor() {}
}
