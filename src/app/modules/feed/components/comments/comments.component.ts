import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { Comments } from '../../../shared/types/comment.types';

@Component({
    selector: 'hr-comments',
    imports: [DatePipe, NgClass],
    templateUrl: './comments.component.html',
})
export class CommentsComponent {
    comments = input<Comments>();
}
