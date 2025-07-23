import { Component, inject, input } from '@angular/core';
import { ImageCarouselService } from '../../../shared/image-carousel/image-carousel.service';
import { getImageSrc } from './post-images.utils';

@Component({
    standalone: true,
    template: `
        <div class="tw-mt-4">
            <img
                class="tw-cursor-pointer tw-w-full tw-h-80 tw-rounded-lg tw-object-cover"
                [src]="getImageSrc(images()[0])"
                [alt]="'Imagen del post'"
                loading="lazy"
                (click)="openCarousel(0)"
            />
        </div>
    `,
})
export class SingleImageComponent {
    images = input.required<string[]>();

    private readonly imageCarouselService = inject(ImageCarouselService);

    getImageSrc(image: string): string {
        return getImageSrc(image);
    }

    openCarousel(index: number) {
        this.imageCarouselService.open(this.images(), index);
    }
}
