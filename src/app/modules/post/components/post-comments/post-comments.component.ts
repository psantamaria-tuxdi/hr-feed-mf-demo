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
    private readonly commentService = inject(CommentService);

    postId = input.required<string>();

    resource = rxResource({
        loader: () => this.commentService.getAll(this.postId()),
    });

    items = this.resource.value;

    onCreated(isCreated: boolean) {
        if (isCreated) {
            this.resource.reload();
        }
    }
}
