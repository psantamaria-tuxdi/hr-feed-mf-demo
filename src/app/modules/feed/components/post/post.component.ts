import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LikeService } from 'app/core/data/post/like.service';
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
    private readonly likeService = inject(LikeService);

    readonly apiURL = environment.apiUrl;

    post = input.required<Post>();

    toggleLike(): void {
        const post = this.post();
        const {
            _id: postId,
            engagement: { likes },
        } = post;
        const willLike = !likes.isLikedByCurrentUser;

        this.likeService.toggleLike(willLike, postId).subscribe(() => {
            this.updateLikeState(willLike, likes);
        });
    }

    private updateLikeState(
        isLike: boolean,
        likes: { isLikedByCurrentUser: boolean; count: number }
    ): void {
        likes.isLikedByCurrentUser = isLike;
        likes.count += isLike ? 1 : -1;
    }
}
