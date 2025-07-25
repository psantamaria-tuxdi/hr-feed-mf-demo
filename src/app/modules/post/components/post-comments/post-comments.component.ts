import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'app/modules/post/services/comment.service';
import { AvatarComponent } from 'app/modules/shared/components/avatar/avatar.component';
import { TimeAgoPipe } from 'app/modules/shared/pipes/time-ago.pipe';
import { Comment, Reply } from 'app/modules/shared/types/comment.types';
import { finalize } from 'rxjs';
import { LikeService } from '../../services/like.service';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CreateReplyComponent } from '../create-reply/create-reply.component';

@Component({
  selector: 'hr-comments',
  imports: [
    TimeAgoPipe,
    NgClass,
    CreateCommentComponent,
    AvatarComponent,
    CreateReplyComponent,
  ],
  templateUrl: './post-comments.component.html',
})
export class PostCommentsComponent {
  replyId: string;
  postId = input.required<string>();
  commentsChange = output<void>();

  private readonly commentService = inject(CommentService);
  private readonly likeService = inject(LikeService);
  private readonly snackBar = inject(MatSnackBar);

  private resource = rxResource({
    loader: () => this.commentService.getAll(this.postId()),
  });

  comments = linkedSignal<Comment[]>(() => this.resource.value());
  isLoading = this.resource.isLoading;
  isRequesting = signal<boolean>(false);

  onCreated(isCreated: boolean) {
    if (isCreated) {
      this.resource.reload();
      this.commentsChange.emit();
    }
  }

  onCreatedReply(isCreated: boolean) {
    if (isCreated) {
      this.onReply(null);
      this.resource.reload();
      this.commentsChange.emit();
    }
  }

  onReply(commentId: string) {
    this.replyId = commentId;
  }

  toggleLikeComment(comment: Comment): void {
    this.toggleLike(comment, null, 'Error al dar like al comentario');
  }

  toggleLikeReply(comment: Comment, reply: Reply): void {
    this.toggleLike(comment, reply, 'Error al dar like a la respuesta');
  }

  private toggleLike(
    comment: Comment,
    reply: Reply | null,
    errorMessage: string
  ): void {
    if (this.isRequesting()) return;

    this.isRequesting.set(true);
    const targetItem = reply || comment;
    const targetId = targetItem._id;

    this.updateLikeState(comment, reply);

    this.likeService
      .toggleLikeComment(this.postId(), targetId)
      .pipe(finalize(() => this.isRequesting.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.handleLikeError(comment, reply, errorMessage);
            return;
          }

          const shouldBeLiked = response.action === 'liked';
          if (targetItem.isLikedByCurrentUser !== shouldBeLiked) {
            this.updateLikeState(comment, reply);
          }
        },
        error: () => {
          this.handleLikeError(comment, reply, errorMessage);
        },
      });
  }

  // TODO: Migrate to a snackbar service
  // This is a temporary solution to handle errors in the like functionality.
  private handleLikeError(
    comment: Comment,
    reply: Reply | null,
    errorMessage: string
  ): void {
    this.snackBar.open(errorMessage, 'Cerrar', {
      duration: 3000,
    });
    this.updateLikeState(comment, reply);
  }

  private updateLikeState(comment: Comment, reply: Reply | null): void {
    if (reply) {
      this.toggleReplyLikeState(comment, reply);
    } else {
      this.toggleCommentLikeState(comment);
    }
  }

  private toggleCommentLikeState(comment: Comment): void {
    this.comments.update((previous) => {
      const newComments = Array.from(previous);
      const commentIndex = newComments.findIndex((c) => c._id === comment._id);

      const isLiked = !comment.isLikedByCurrentUser;
      newComments[commentIndex] = {
        ...comment,
        likes: comment.likes + (isLiked ? 1 : -1),
        isLikedByCurrentUser: isLiked,
      };
      return newComments;
    });
  }

  private toggleReplyLikeState(comment: Comment, reply: Reply) {
    this.comments.update((previous) => {
      const newComments = Array.from(previous);
      const commentIndex = newComments.findIndex((c) => c._id === comment._id);
      const replyIndex = newComments[commentIndex].replies.findIndex(
        (c) => c._id === reply._id
      );

      const isLiked = !reply.isLikedByCurrentUser;
      newComments[commentIndex].replies[replyIndex] = {
        ...reply,
        likes: reply.likes + (isLiked ? 1 : -1),
        isLikedByCurrentUser: isLiked,
      };
      return newComments;
    });
  }
}
