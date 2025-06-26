import { DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Post } from '../../../shared/types/post.types';
import { CommentsComponent } from '../comments/comments.component';
import { AvatarModule } from 'ngx-avatars';
import { environment } from 'environments/environment';

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
        AvatarModule
    ],
    templateUrl: './post.component.html',
})
export class PostComponent {
    post = input.required<Post>();
    baseUrl = environment.baseUrl;
}
