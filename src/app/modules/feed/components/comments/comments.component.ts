import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Comments } from '../../../shared/types/comment.types';
import { AvatarModule } from 'ngx-avatars';

@Component({
    selector: 'hr-comments',
    imports: [DatePipe, NgClass, AvatarModule],
    templateUrl: './comments.component.html',
})
export class CommentsComponent {
    comments = input<Comments>();
}
