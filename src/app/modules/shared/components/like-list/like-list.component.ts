import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { LikeService } from 'app/modules/post/services/like.service';
import { AvatarModule } from 'ngx-avatars';
import { AvatarComponent } from '../avatar/avatar.component';
import { LieListSkeletonComponent } from './like-list-skeleton.component';

@Component({
    selector: 'hr-like-list',
    templateUrl: './like-list.component.html',
    standalone: true,
    imports: [AvatarModule, MatIcon, AvatarComponent, LieListSkeletonComponent],
})
export class LikeListComponent {
    private readonly likeService = inject(LikeService);

    readonly dialogRef = inject(MatDialogRef<LikeListComponent>);
    readonly data = inject<string>(MAT_DIALOG_DATA);

    private resource = rxResource({
        loader: () => this.likeService.getAllByPost(this.data),
    });

    likeList = this.resource.value.asReadonly();
    isLoading = this.resource.isLoading;

    onClose() {
        this.dialogRef.close();
    }
}
