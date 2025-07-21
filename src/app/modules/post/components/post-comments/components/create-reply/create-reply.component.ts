import { Component, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormControl,
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
import { UserService } from 'app/core/user/user.service';
import { CommentService } from 'app/modules/post/services/comment.service';
import { CreateCommentDto } from 'app/modules/shared/types/comment.types';
import { AvatarModule } from 'ngx-avatars';
import { finalize } from 'rxjs';

@Component({
    selector: 'hr-create-reply',
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
    templateUrl: './create-reply.component.html',
})
export class CreateReplyComponent {
    postId = input.required<string>();
    commentId = input.required<string>();
    commentCreated = output<boolean>();

    user = toSignal(inject(UserService).user$);
    maxCommentCharacters: number = 1000;
    commentForm: FormGroup<{ content: FormControl<string> }>;

    private readonly commentService = inject(CommentService);
    private formBuilder = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);

    constructor() {
        this.commentForm = this.formBuilder.group({
            content: ['', [Validators.maxLength(this.maxCommentCharacters)]],
        });
    }

    onSubmit() {
        if (this.commentForm.valid) {
            this.commentForm.disable();
            const replyDto: CreateCommentDto = {
                content: this.commentForm.value.content,
                parentCommentId: this.commentId(),
            };
            this.commentService
                .create(this.postId(), replyDto)
                .pipe(
                    finalize(() => {
                        this.commentForm.enable();
                        this.resetForm();
                    })
                )
                .subscribe({
                    next: () => {
                        this.commentCreated.emit(true);
                        this.showSnackBar('Se compartió tu respuesta!');
                    },
                    error: (error) => {
                        this.commentCreated.emit(false);
                        this.showSnackBar('Error al crear la respuesta');
                        console.error('Error creating reply:', error);
                    },
                });
        }
    }

    resetForm() {
        this.commentForm.reset({
            content: '',
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
