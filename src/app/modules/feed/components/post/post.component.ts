import { DatePipe, NgClass } from '@angular/common';
import {
    Component,
    computed,
    DestroyRef,
    inject,
    input,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommentService } from 'app/core/data/post/comment.service';
import { environment } from 'environments/environment';
import { AvatarModule } from 'ngx-avatars';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Post } from '../../../shared/types/post.types';
import { CommentsComponent } from '../comments/comments.component';

@Component({
    selector: 'hr-post',
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        DatePipe,
        NgClass,
        CommentsComponent,
        AvatarModule,
    ],
    templateUrl: './post.component.html',
})
export class PostComponent {
    private readonly commentsService = inject(CommentService);
    private _destroyRef = inject(DestroyRef);
    readonly apiURL = environment.apiUrl;

    post = input.required<Post>();
    id = computed(() => this.post()._id);
    comments = computed(() => this.post().engagement.comments);
    isLoading = signal<boolean>(false);

    loadComments() {
        if (this.comments().items) return; // Comments already loaded

        this.isLoading.set(true);
        this.commentsService
            .getAll(this.id())
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((items) => {
                this.comments().items = items;
                this.isLoading.set(false);
            });
    }
}
