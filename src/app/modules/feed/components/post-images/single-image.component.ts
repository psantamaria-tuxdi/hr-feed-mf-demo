import { Component, input } from '@angular/core';
import { getImageSrc } from './post-images.utils';

@Component({
    standalone: true,
    template: `
        <div class="tw-mt-4">
            <div class="tw-relative tw-mb-4">
                <img
                    class="tw-w-full tw-rounded-lg tw-object-cover"
                    [src]="getImageSrc(images()[0])"
                    [alt]="'Imagen del post'"
                    loading="lazy"
                />
            </div>
        </div>
    `,
})
export class SingleImageComponent {
    images = input.required<string[]>();
    getImageSrc = getImageSrc;
}
