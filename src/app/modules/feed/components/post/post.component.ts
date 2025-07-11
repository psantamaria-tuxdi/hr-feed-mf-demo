import { DatePipe, NgClass } from '@angular/common';
import {
    Component,
    computed,
    inject,
    input,
    linkedSignal,
    signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LikeService } from 'app/core/data/post/like.service';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { AvatarModule } from 'ngx-avatars';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Post } from '../../../shared/types/post.types';
import { Author } from '../../../shared/types/author.types';
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
export class PostComponent {
    private readonly likeService = inject(LikeService);
    private readonly snackBar = inject(MatSnackBar);
    user = toSignal(inject(UserService).user$);

    readonly apiURL = environment.apiUrl;

    post = input.required<Post>();

    isLikedByCurrentUser = linkedSignal(() => this.post().engagement.likes.isLikedByCurrentUser);
    likesCount = computed<number>(() => {
        const count = this.post().engagement.likes.count;

        // If local liked state differs from the received state, adjust the count
        if (this.isLikedByCurrentUser() !== this.post().engagement.likes.isLikedByCurrentUser) {
            return count + (this.isLikedByCurrentUser() ? 1 : -1);
        }
        return count;
    })
    topLikers = computed<Author[]>(() => {
        const otherLikers = this.post().engagement.likes.topLikers.filter(
            (liker) => liker._id !== this.user()._id
        );

        return this.isLikedByCurrentUser() ? [this.user(), ...otherLikers] : otherLikers;
    });
    isRequesting = signal<boolean>(false);

    toggleLike(): void {
        this.isRequesting.set(true);
        this.toggleLikedState();

        this.likeService.toggleLike(this.post()._id)
            .pipe(finalize(() => this.isRequesting.set(false)))
            .subscribe({
                next: (response) => {
                    if (!response.success) {
                        this.handleLikeError();
                        return;
                    }

                    const currentLikeState = this.isLikedByCurrentUser();
                    const shouldBeLiked = response.action === 'liked';

                    if (currentLikeState !== shouldBeLiked) {
                        this.toggleLikedState();
                    }
                },
                error: () => {
                    this.handleLikeError();
                },
            })
    }

    private toggleLikedState() {
        this.isLikedByCurrentUser.update(liked => !liked);
    }

    private handleLikeError() {
        this.snackBar.open(
            'Error al dar like a la publicación',
            'Cerrar',
            {
                duration: 3000,
            }
        );
        this.toggleLikedState();
    }
}
