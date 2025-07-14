import { Component, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'app/core/data/post/comment.service';
import { CreateCommentDto } from 'app/core/data/post/post.types';
import { UserService } from 'app/core/user/user.service';
import { AvatarModule } from 'ngx-avatars';
import { finalize } from 'rxjs';

@Component({
    selector: 'hr-create-comments',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        AvatarModule,
        MatFormField,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-comment.component.html',
})
export class CreateCommentComponent {
    private readonly commentService = inject(CommentService);
    private formBuilder = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);

    user = toSignal(inject(UserService).user$);
    postId = input.required<string>();
    onCommentCreated = output<boolean>()
    maxCommentCharacters: number = 1000;
    commentForm: FormGroup;
    text: string;

    constructor() {
        this.commentForm = this.formBuilder.group({
            text: ['', [Validators.maxLength(this.maxCommentCharacters)]],
        });
    }

    onSubmit() {
        if (this.commentForm.valid) {
            this.commentForm.disable();
            const commentDto: CreateCommentDto = {
                content: this.commentForm.get('text').value,
            };
            this.commentService
                .post(this.postId(), commentDto)
                .pipe(
                    finalize(() => {
                        this.commentForm.enable();
                        this.resetForm();
                    })
                )
                .subscribe({
                    next: () => {
                        this.onCommentCreated.emit(true);
                        this.showSnackBar('Se compartió tu comentario!');
                    },
                    error: (error) => {
                        this.onCommentCreated.emit(false);
                        this.showSnackBar('Error al crear el comentario');
                        console.error('Error creating post:', error);
                    },
                });
        }
    }

    resetForm() {
        this.commentForm.reset({
            text: '',
            allowComments: true,
        });
    }

    // TODO: migrate to a snackbar service
    // For now, using MatSnackBar directly
    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
        });
    }
}
