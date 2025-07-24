import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IconsService {
  baseUrl = environment.baseUrl;
  /**
   * Constructor
   */
  constructor() {
    const domSanitizer = inject(DomSanitizer);
    const matIconRegistry = inject(MatIconRegistry);

    // Register icon sets
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/material-twotone.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'mat_outline',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/material-outline.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'mat_solid',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/material-solid.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'feather',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/feather.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_outline',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/heroicons-outline.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_solid',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/heroicons-solid.svg'
      )
    );
    matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_mini',
      domSanitizer.bypassSecurityTrustResourceUrl(
        this.baseUrl + '/icons/heroicons-mini.svg'
      )
    );
  }
}
