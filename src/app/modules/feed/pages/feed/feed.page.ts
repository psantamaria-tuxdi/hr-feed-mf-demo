import { Component, inject, signal } from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { LoaderFullComponent } from 'app/modules/shared/components/loader-full/loader-full.component';
import { FeedService } from '../../services/feed.service';

@Component({
    selector: 'hr-feed-page',
    templateUrl: './feed.page.html',
    imports: [PostComponent, CreatePostComponent, LoaderFullComponent],
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
