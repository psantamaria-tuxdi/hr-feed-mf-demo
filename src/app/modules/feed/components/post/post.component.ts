import { DatePipe, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LikeService } from 'app/core/data/post/like.service';
import { AvatarModule } from 'ngx-avatars';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Post } from '../../../shared/types/post.types';
import { Author } from '../../../shared/types/author.types';
import { CommentsComponent } from '../comments/comments.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { getImageComponent } from '../post-images/post-images.utils';

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
        NgComponentOutlet,
    ],
    templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
    private readonly likeService = inject(LikeService);
    private readonly snackBar = inject(MatSnackBar);

    post = input.required<Post>();
    isLikedByCurrentUser = signal<boolean>(false);
    likesCount = signal<number>(0);
    topLikers = signal<Author[]>([]);
    isRequesting = signal<boolean>(false);

    ngOnInit(): void {
        this.isLikedByCurrentUser.set(this.post().engagement.likes.isLikedByCurrentUser);
        this.likesCount.set(this.post().engagement.likes.count);
        this.topLikers.set(this.post().engagement.likes.topLikers);
    }

    toggleLike(): void {
        this.isRequesting.set(true);
        this.updateLikesState();

        this.likeService.toggleLike(this.post()._id)
            .pipe(finalize(() => this.isRequesting.set(false)))
            .subscribe({
                next: (response) => {
                    if (!response.success) {
                        this.manageError();
                        return;
                    }

                    const currentLikeState = this.isLikedByCurrentUser();
                    const shouldBeLiked = response.action === 'liked';

                    if (currentLikeState !== shouldBeLiked) {
                        this.updateLikesState();
                    }
                },
                error: () => {
                    this.manageError();
                },
            });
    }

    getImageComponent(imageCount: number) {
        return getImageComponent(imageCount);
    }

    private updateLikesState() {
        const currentLikeState = this.isLikedByCurrentUser();
        this.isLikedByCurrentUser.set(!currentLikeState);
        this.likesCount.update(count => count + (!currentLikeState ? 1 : -1));

        const currentTopLikers = this.topLikers();
        this.topLikers.set(!currentLikeState
                ? [...currentTopLikers, this.post().author]
            : currentTopLikers.filter(liker => liker._id !== this.post().author._id));
    }

    private manageError() {
        this.snackBar.open(
            'Error al dar like a la publicación',
            'Cerrar',
            {
                duration: 3000,
            }
        );
        this.updateLikesState();
    }
}
