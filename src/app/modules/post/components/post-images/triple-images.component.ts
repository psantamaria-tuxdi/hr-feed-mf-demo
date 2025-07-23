import { Component, inject, input } from '@angular/core';
import { ImageCarouselService } from '../../../shared/image-carousel/image-carousel.service';
import { getImageSrc } from './post-images.utils';

@Component({
    standalone: true,
    template: `
        <div class="tw-mt-4 tw-flex">
            <div class="tw-flex tw-h-80 tw-w-2/3 tw-pr-1">
                <img
                    class="tw-cursor-pointer tw-rounded tw-object-cover"
                    [src]="getImageSrc(images()[0])"
                    [alt]="'Imagen del post'"
                    loading="lazy"
                    (click)="openCarousel(0)"
                />
            </div>
            <div class="tw-flex tw-w-1/3 tw-flex-col tw-pl-1">
                <div class="tw-flex tw-h-40 tw-pb-1">
                    <img
                        class="tw-cursor-pointer tw-rounded tw-object-cover"
                        [src]="getImageSrc(images()[1])"
                        [alt]="'Imagen del post'"
                        loading="lazy"
                        (click)="openCarousel(1)"
                    />
                </div>
                <div class="tw-flex tw-h-40 tw-pt-1">
                    <img
                        class="tw-cursor-pointer tw-rounded tw-object-cover"
                        [src]="getImageSrc(images()[2])"
                        [alt]="'Imagen del post'"
                        loading="lazy"
                        (click)="openCarousel(2)"
                    />
                </div>
            </div>
        </div>
    `,
})
export class TripleImagesComponent {
    images = input.required<string[]>();

    private readonly imageCarouselService = inject(ImageCarouselService);

    getImageSrc(image: string): string {
        return getImageSrc(image);
    }

    openCarousel(index: number) {
        this.imageCarouselService.open(this.images(), index);
    }
}
