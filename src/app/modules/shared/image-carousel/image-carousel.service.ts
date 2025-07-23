import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCarouselComponent } from './image-carousel.component';

@Injectable({
  providedIn: 'root',
})
export class ImageCarouselService {
  private _matDialog = inject(MatDialog);

  open(images: string[], index: number) {

    return this._matDialog.open(ImageCarouselComponent, {
      data: {
        images: images,
        startIndex: index,
      },
      panelClass: ['mf-tw-container'],
      autoFocus: false,
      hasBackdrop: true,
      enterAnimationDuration: '0ms',
    });
  }
}
