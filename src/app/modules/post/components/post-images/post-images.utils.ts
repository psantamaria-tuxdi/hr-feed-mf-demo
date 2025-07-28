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
  // Default to SingleImageComponent if count is not found
  return imagesComponentMap[imageCount] || imagesComponentMap[1];
}

/**
 * For now backend stores only the relative path or filename in the database
 * Frontend prepends the API base URL as needed
 * This method makes it easier to migrate to a CDN or object storage later
 * when we move to a CDN or bucket
 */
export function getImageSrc(image: string): string {
  return image.startsWith('http') ? image : environment.apiUrl + image;
}
