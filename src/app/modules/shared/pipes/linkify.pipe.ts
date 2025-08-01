import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { URL_REGEX, normalizeUrl } from '../utils/url.utils';

@Pipe({
  name: 'linkify',
  pure: true,
})
export class LinkifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string): SafeHtml {
    if (!text) {
      return text;
    }

    // Replace URLs with anchor tags
    const linkifiedText = text.replace(URL_REGEX, (match) => {
      const normalizedUrl = normalizeUrl(match);
      const displayText =
        match.length > 50 ? match.substring(0, 47) + '...' : match;

      return `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer" class="tw-text-blue-600 hover:tw-text-blue-800 hover:tw-underline">${displayText}</a>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(linkifiedText);
  }
}
