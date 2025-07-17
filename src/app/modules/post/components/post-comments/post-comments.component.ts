import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommentService } from 'app/modules/post/services/comment.service';
import { AvatarModule } from 'ngx-avatars';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { CreateReplyComponent } from './components/create-reply/create-reply.component';

@Component({
    selector: 'hr-comments',
    imports: [
        DatePipe,
        NgClass,
        AvatarModule,
        CreateCommentComponent,
        CreateReplyComponent,
    ],
    templateUrl: './post-comments.component.html',
})
export class PostCommentsComponent {
    showReplyForm: boolean = false;
    replyId: string;
    postId = input.required<string>();
    private readonly commentService = inject(CommentService);

    private resource = rxResource({
        loader: () => this.commentService.getAll(this.postId()),
    });

    comments = this.resource.value.asReadonly();
    isLoading = this.resource.isLoading;

    onCreated(isCreated: boolean) {
        if (isCreated) {
            this.resource.reload();
        }
    }

    onCreatedReply(isCreated: boolean) {
        if (isCreated) {
            this.onReply(null);
            this.resource.reload();
        }
    }

    onReply(commentId: string) {
        this.showReplyForm = !this.showReplyForm;
        this.replyId = commentId;
    }
}
