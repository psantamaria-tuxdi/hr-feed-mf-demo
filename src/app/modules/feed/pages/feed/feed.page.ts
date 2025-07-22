import { Component, inject, OnInit } from '@angular/core';
import { PostSkeletonComponent } from 'app/modules/post/components/post-skeleton.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { PostComponent } from '../../../post/post.component';
import { FeedService } from '../../services/feed.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'hr-feed-page',
    templateUrl: './feed.page.html',
    imports: [PostComponent, CreatePostComponent, PostSkeletonComponent, InfiniteScrollDirective],
})
export class FeedPage implements OnInit {
    private readonly feedService = inject(FeedService);
    posts = this.feedService.feed;
    isLoading = this.feedService.isLoading;
    hasMore = this.feedService.hasMore;

    /**
     * Determines the scroll container for infinite scrolling.
     * The scroll container varies according to the environment.
     */
    scrollContainerElement = environment.name === 'humanage' ? document.querySelector('mf-hr-root') : document;

    ngOnInit() {
        this.feedService.load();
    }

    fetchMore() {
        this.feedService.fetchMore();
    }

    /**
     * Constructor
     */
    constructor() {}
}
}
