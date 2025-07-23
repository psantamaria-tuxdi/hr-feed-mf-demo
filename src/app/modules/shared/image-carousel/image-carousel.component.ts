import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import type { SwiperContainer } from 'swiper/element';
import { getImageSrc } from '../../post/components/post-images/post-images.utils';

@Component({
  standalone: true,
  imports: [CommonModule, MatIconModule, MatIconModule],
  templateUrl: './image-carousel.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageCarouselComponent implements AfterViewInit {
  images = signal<string[]>([]);
  startIndex: number = 0;
  @ViewChild('swiperRef', { static: false })
  swiperRef?: ElementRef<SwiperContainer>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data?: { images: string[]; startIndex: number },
    private dialogRef?: MatDialogRef<ImageCarouselComponent>
  ) {
    if (data) {
      this.images.set(data.images);
      this.startIndex = data.startIndex;
    }
  }

  ngAfterViewInit() {
    // Set initial slide if needed
    const swiperEl = this.swiperRef?.nativeElement;
    if (swiperEl && this.startIndex > 0) {
      swiperEl.swiper.slideTo(this.startIndex, 0);
    }
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getImageSrc(image: string): string {
    return getImageSrc(image);
  }
}
