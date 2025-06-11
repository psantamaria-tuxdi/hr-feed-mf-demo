import {
    ChangeDetectionStrategy,
    Component,
    signal,
    ViewEncapsulation,
} from '@angular/core';
import { PostComponent } from '../../components/post/post.component';
import { CreatePostComponent } from '../../components/create-post/create-post.component';
import { Post } from 'app/modules/shared/types/post.types';
import { postMock } from '../../components/post/post.mock';

@Component({
    selector: 'hr-feed-page',
    templateUrl: './feed.page.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PostComponent,
        CreatePostComponent,
    ],
})
export class FeedPage {
    // TODO: Replace with real user data
    posts = signal<Post[]>([postMock, postMock]);

    /**
     * Constructor
     */
    constructor() {}
}
