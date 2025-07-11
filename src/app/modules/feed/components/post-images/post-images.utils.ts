import { environment } from '../../../../../environments/environment';
import { DualImagesComponent } from './dual-images.component';
import { SingleImageComponent } from './single-image.component';
import { TripleImagesComponent } from './triple-images.component';

const imagesComponentMap = {
    1: SingleImageComponent,
    2: DualImagesComponent,
    3: TripleImagesComponent,
};

export function getImageComponent(imageCount: number) {
    return imagesComponentMap[imageCount] || null;
}

export function getImageSrc(image: string): string {
    return image.startsWith('http') ? image : environment.apiUrl + image;
}
