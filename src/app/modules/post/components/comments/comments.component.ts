import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommentService } from 'app/core/data/post/comment.service';
import { AvatarModule } from 'ngx-avatars';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';

@Component({
    selector: 'hr-comments',
    imports: [DatePipe, NgClass, AvatarModule, CreateCommentComponent],
    templateUrl: './comments.component.html',
})
export class CommentsComponent {
    private readonly commentService = inject(CommentService);

    postId = input.required<string>();

    resource = rxResource({
        request: this.postId,
        loader: ({ request: postId }) => this.commentService.getAll(postId),
    });

    items = this.resource.value;

    onCreated(isCreated: boolean) {
        if (isCreated) {
            this.resource.reload();
        }
    }
}
