import { Component, input } from '@angular/core';
import { getImageSrc } from './post-images.utils';

@Component({
    standalone: true,
    template: `
        <div class="tw-mt-4 tw-flex">
            <div class="tw-flex tw-h-80 tw-w-1/2 tw-pr-1">
                <img
                    class="tw-rounded tw-object-cover"
                    [src]="getImageSrc(images()[0])"
                    [alt]="'Imagen del post'"
                    loading="lazy"
                />
            </div>
            <div class="tw-flex tw-h-80 tw-w-1/2 tw-pl-1">
                <img
                    class="tw-rounded tw-object-cover"
                    [src]="getImageSrc(images()[1])"
                    [alt]="'Imagen del post'"
                    loading="lazy"
                />
            </div>
        </div>
    `,
})
export class DualImagesComponent {
    images = input.required<string[]>();
    getImageSrc = getImageSrc;
}
