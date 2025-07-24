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

  onCommentLike(commentId: string) {
    this.likeService.toggleLikeComment(this.postId(), commentId);
  }

  toggleLikeComment(comment: Comment): void {
    if (this.isRequesting()) return;
    this.isRequesting.set(true);
    this.toggleLikeState(comment);

    this.likeService
      .toggleLikeComment(this.postId(), comment._id)
      .pipe(finalize(() => this.isRequesting.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.handleLikeError(comment);
            return;
          }

          const shouldBeLiked = response.action === 'liked';
          if (comment.isLikedByCurrentUser !== shouldBeLiked) {
            this.toggleLikeState(comment);
          }
        },
        error: () => {
          this.handleLikeError(comment);
        },
      });
  }

  handleLikeError(comment: Comment) {
    this.snackBar.open('Error al dar like al comentario', 'Cerrar', {
      duration: 3000,
    });
    this.toggleLikeState(comment);
  }

  toggleLikeReply(comment: Comment, reply: Reply) {
    if (this.isRequesting()) return;
    this.isRequesting.set(true);
    this.toggleReplyLikeState(comment, reply);
    this.likeService
      .toggleLikeComment(this.postId(), reply._id)
      .pipe(finalize(() => this.isRequesting.set(false)))
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.handleLikeReplyError(comment, reply);
            return;
          }

          const shouldBeLiked = response.action === 'liked';
          if (reply.isLikedByCurrentUser !== shouldBeLiked) {
            this.toggleReplyLikeState(comment, reply);
          }
        },
        error: () => {
          this.handleLikeReplyError(comment, reply);
        },
      });
  }

  handleLikeReplyError(comment: Comment, reply: Reply) {
    this.snackBar.open('Error al dar like a la respuesta', 'Cerrar', {
      duration: 3000,
    });
    this.toggleReplyLikeState(comment, reply);
  }

  private toggleLikeState(comment: Comment) {
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
        likes: comment.likes + (isLiked ? 1 : -1),
        isLikedByCurrentUser: isLiked,
      };
      return newComments;
    });
  }
}
