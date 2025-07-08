import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

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
export class PostComponent implements OnInit {
    private readonly likeService = inject(LikeService);
    private readonly snackBar = inject(MatSnackBar);

    readonly apiURL = environment.apiUrl;

    post = input.required<Post>();
    isLikedByCurrentUser = false;
    likesCount = 0;
    topLikers = [];
    isRequesting = false;

    ngOnInit(): void {
        this.isLikedByCurrentUser = this.post().engagement.likes.isLikedByCurrentUser;
        this.likesCount = this.post().engagement.likes.count;
        this.topLikers = this.post().engagement.likes.topLikers;
    }

    toggleLike(): void {
        this.isRequesting = true;
        this.updateLikesState();

        this.likeService.toggleLike(this.post()._id)
            .pipe(finalize(() => this.isRequesting = false))
            .subscribe({
                next: (response) => {
                    if (!response.success) {
                        this.manageError();
                        return;
                    }
                },
                error: () => {
                    this.manageError();
                },
            })
    }

    private updateLikesState() {
        this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
        this.likesCount += this.isLikedByCurrentUser ? 1 : -1;
        this.topLikers = this.isLikedByCurrentUser
            ? [...this.topLikers, this.post().author]
            : this.topLikers.filter(liker => liker._id !== this.post().author._id);
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
