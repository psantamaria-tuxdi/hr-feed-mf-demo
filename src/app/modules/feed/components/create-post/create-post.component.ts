import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, inject, OnDestroy, signal } from '@angular/core';
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
import { UserService } from 'app/core/user/user.service';
import { AvatarComponent } from 'app/modules/shared/components/avatar/avatar.component';
import { LinkPreviewComponent } from 'app/modules/shared/components/link-preview/link-preview.component';
import { LinkPreviewService } from 'app/modules/shared/services/link-preview.service';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subject,
  takeUntil,
} from 'rxjs';
import { CreatePostDto } from '../../../shared/types/post.types';
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
    AvatarComponent,
    LinkPreviewComponent,
    MatSlideToggleModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private feedService = inject(FeedService);
  private linkPreviewService = inject(LinkPreviewService);
  private destroy$ = new Subject<void>();
  user = toSignal(inject(UserService).user$);

  postForm: FormGroup;
  selectedImages: File[] = [];
  isLoading = signal(false);
  imagePreviewUrls: string[] = [];

  detectedUrl = this.linkPreviewService.detectedUrl;
  shouldShowPreview = this.linkPreviewService.shouldShowPreview;

  // TODO: move to constants file
  readonly maxAllowedImages = 3;
  readonly maxCharacters = 2000;

  constructor() {
    this.postForm = this.formBuilder.group({
      text: ['', [Validators.maxLength(this.maxCharacters)]],
      allowComments: [true],
    });

    this.text?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((text: string) => {
        this.linkPreviewService.setInputText(text || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get text() {
    return this.postForm.get('text');
  }

  get canSubmit(): boolean {
    return this.postForm.valid && this.text?.value && !this.isLoading();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      if (this.selectedImages.length + files.length > this.maxAllowedImages) {
        this.showSnackBar(
          `Máximo ${this.maxAllowedImages} imágenes permitidas`
        );
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
    // Clear the input value to allow re-selection of the same file
    // This is necessary because if the same file is selected again, the change event won't fire
    input.value = '';
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imagePreviewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (!this.postForm.valid) return;

    this.isLoading.set(true);
    const postData = this.buildPostData();
    this.postForm.disable();

    this.feedService
      .createPost(postData)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          this.postForm.enable();
        })
      )
      .subscribe({
        next: () => {
          this.resetForm();
          this.showSnackBar('Se compartió tu publicación!');
          this.feedService.load();
        },
        error: (error) => {
          this.showSnackBar('Error al crear la publicación');
          console.error('Error creating post:', error);
        },
      });
  }

  private buildPostData(): CreatePostDto {
    const baseData: CreatePostDto = {
      text: this.text?.value,
      allowComments: this.postForm.get('allowComments')?.value,
      images: this.selectedImages,
    };

    if (this.shouldShowPreview()) {
      baseData.previewUrl = this.detectedUrl();
    }

    return baseData;
  }

  private resetForm(): void {
    this.postForm.reset({
      text: '',
      allowComments: true,
    });

    this.selectedImages = [];
    this.imagePreviewUrls = [];
    this.linkPreviewService.setInputText('');
  }

  // TODO: migrate to a snackbar service
  // For now, using MatSnackBar directly
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
