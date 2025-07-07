import { Component, inject } from '@angular/core';
import { PostSkeletonComponent } from 'app/modules/shared/components/post-skeleton/post-skeleton.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { PostComponent } from '../../components/post/post.component';
import { FeedService } from '../../services/feed.service';

@Component({
    selector: 'hr-feed-page',
    templateUrl: './feed.page.html',
    imports: [PostComponent, CreatePostComponent, PostSkeletonComponent],
})
export class FeedPage {
    private readonly feedService = inject(FeedService);
    posts = this.feedService.feed;
    isLoading = this.feedService.isLoading;

    ngOnInit() {
        this.feedService.load();
    }

    /**
     * Constructor
     */
    constructor() {}
}
