import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseCardComponent } from '@fuse/components/card';
import { CreatePostDto } from 'app/core/data/post/post.types';
import { UserService } from 'app/core/user/user.service';
import { AvatarModule } from 'ngx-avatars';
import { FeedService } from '../../services/feed.service';

@Component({
    selector: 'hr-create-post',
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        AvatarModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './create-post.component.html',
})
export class CreatePostComponent {
    private formBuilder = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);
    private feedService = inject(FeedService);

    user = toSignal(inject(UserService).user$);

    postForm: FormGroup;
    selectedImages: File[] = [];
    isLoading = signal(false);
    imagePreviewUrls: string[] = [];

    readonly maxAllowedImages = 10;

    constructor() {
        this.postForm = this.formBuilder.group({
            text: ['', [Validators.required, Validators.maxLength(2000)]],
            allowComments: [true],
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const files = Array.from(input.files);

            // Validate max 10 images
            if (
                this.selectedImages.length + files.length >
                this.maxAllowedImages
            ) {
                this.showSnackBar('Máximo 10 imágenes permitidas');
                return;
            }

            this.selectedImages = [...this.selectedImages, ...files];

            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviewUrls.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
        input.value = '';
    }

    removeImage(index: number): void {
        this.selectedImages.splice(index, 1);
        this.imagePreviewUrls.splice(index, 1);
    }

    onSubmit(): void {
        if (this.postForm.valid) {
            this.isLoading.set(true);

            const postData: CreatePostDto = {
                text: this.postForm.get('text')?.value,
                allowComments: this.postForm.get('allowComments')?.value,
                images: this.selectedImages,
            };
            this.postForm.disable();

            this.feedService.createPost(postData).subscribe({
                next: (response) => {
                    this.isLoading.set(false);
                    this.showSnackBar('Se compartió tu publicación!');
                    this.postForm.enable();
                    this.resetForm();
                },
                error: (error) => {
                    this.isLoading.set(false);
                    this.showSnackBar('Error al crear la publicación');
                    console.error('Error creating post:', error);
                },
            });
        }
    }

    get canSubmit(): boolean {
        return this.postForm.valid && !this.isLoading();
    }

    private resetForm(): void {
        this.postForm.reset({
            text: '',
            allowComments: true,
        });
        this.postForm.get('text')?.setErrors(null);

        this.selectedImages = [];
        this.imagePreviewUrls = [];
    }

    // TODO: migrate to a snackbar service
    // For now, using MatSnackBar directly
    private showSnackBar(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}
