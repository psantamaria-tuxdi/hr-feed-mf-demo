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
import { CommentService } from '../../services/comment.service';
import { UserService } from 'app/core/user/user.service';
import { AvatarComponent } from 'app/modules/shared/components/avatar/avatar.component';
import { finalize } from 'rxjs';
import { CreateCommentDto } from '../../../shared/types/comment.types';

@Component({
    selector: 'hr-create-comment',
    imports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        AvatarComponent,
        MatFormField,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './create-comment.component.html',
})
export class CreateCommentComponent {
    postId = input.required<string>();
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

            this.commentService
                .create(
                    this.postId(),
                    this.commentForm.value as CreateCommentDto
                )
                .pipe(
                    finalize(() => {
                        this.commentForm.enable();
                        this.resetForm();
                    })
                )
                .subscribe({
                    next: () => {
                        this.commentCreated.emit(true);
                        this.showSnackBar('Se compartió tu comentario!');
                    },
                    error: (error) => {
                        this.commentCreated.emit(false);
                        this.showSnackBar('Error al crear el comentario');
                        console.error('Error creating comment:', error);
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
