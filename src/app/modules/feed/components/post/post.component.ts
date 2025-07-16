import { DatePipe, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LikeService } from 'app/core/data/post/like.service';
import { UserService } from 'app/core/user/user.service';
import { AvatarModule } from 'ngx-avatars';
import { finalize } from 'rxjs';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Likes, Post } from '../../../shared/types/post.types';
import { CommentsComponent } from '../comments/comments.component';
import { getImageComponent } from '../post-images/post-images.utils';
import { LikesCountPipe } from './likes-count.pipe';

@Component({
    selector: 'hr-post',
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        DatePipe,
        NgClass,
        CommentsComponent,
        AvatarModule,
        LikesCountPipe,
        NgComponentOutlet,
    ],
    templateUrl: './post.component.html',
})
export class PostComponent {
    private readonly likeService = inject(LikeService);
    private readonly snackBar = inject(MatSnackBar);
    user = toSignal(inject(UserService).user$);

    post = input.required<Post>();

    likes = linkedSignal<Likes>(() => this.post().engagement.likes);

    isRequesting = signal<boolean>(false);

    toggleLike(): void {
        this.isRequesting.set(true);
        this.toggleLikeState();

        this.likeService
            .toggleLike(this.post()._id)
            .pipe(finalize(() => this.isRequesting.set(false)))
            .subscribe({
                next: (response) => {
                    if (!response.success) {
                        this.handleLikeError();
                        return;
                    }

                    const shouldBeLiked = response.action === 'liked';
                    if (this.likes().isLikedByCurrentUser !== shouldBeLiked) {
                        this.toggleLikeState();
                    }
                },
                error: () => {
                    this.handleLikeError();
                },
            });
    }

    getImageComponent(imageCount: number) {
        return getImageComponent(imageCount);
    }

    private toggleLikeState() {
        const isLiked = !this.likes().isLikedByCurrentUser;
        this.likes.update(previous => ({
            isLikedByCurrentUser: isLiked,
            count: previous.count + (isLiked ? 1 : -1),
            topLikers: isLiked
                ? [this.user(), ...previous.topLikers]
                : previous.topLikers.filter(liker => liker._id !== this.user()._id),
        }));
    }

    private handleLikeError() {
        this.snackBar.open(
            'Error al dar like a la publicación',
            'Cerrar',
            {
                duration: 3000,
            }
        );
        this.toggleLikeState();
    }
}
