import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommentService } from 'app/modules/post/services/comment.service';
import { AvatarModule } from 'ngx-avatars';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
    selector: 'hr-comments',
    imports: [DatePipe, NgClass, AvatarModule, CreateCommentComponent],
    templateUrl: './post-comments.component.html',
})
export class PostCommentsComponent {
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
}
