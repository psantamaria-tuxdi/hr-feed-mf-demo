import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardComponent } from '../../../../../@fuse/components/card';
import { Post } from '../../../shared/types/post.types';
import { DatePipe, NgClass } from '@angular/common';
import { postMock } from './post.mock';

@Component({
    selector: 'hr-post',
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        DatePipe,
        NgClass
    ],
    templateUrl: './post.component.html',
})
export class PostComponent {
    post = input<Post>(postMock);
}
