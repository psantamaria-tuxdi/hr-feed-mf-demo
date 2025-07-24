import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommentService } from 'app/modules/post/services/comment.service';
import { AvatarComponent } from 'app/modules/shared/components/avatar/avatar.component';
import { TimeAgoPipe } from 'app/modules/shared/pipes/time-ago.pipe';
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

  private resource = rxResource({
    loader: () => this.commentService.getAll(this.postId()),
  });

  comments = this.resource.value.asReadonly();
  isLoading = this.resource.isLoading;

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
}
