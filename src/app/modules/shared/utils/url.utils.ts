/**
 * URL-related utilities and constants
 */

/**
 * Enhanced URL regex pattern that detects various URL formats:
 * - https://example.com
 * - http://example.com
 * - www.example.com
 * - example.com
 * - subdomain.example.com
 * - URLs with paths, query parameters, etc.
 */
export const URL_REGEX =
  /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.([a-zA-Z]{2,})(\/[^\s]*)?)/;

/**
 * Normalizes a URL by adding https:// protocol if not present
 * @param url - The URL to normalize
 * @returns The normalized URL with proper protocol
 */
export function normalizeUrl(url: string): string {
  // If URL already has a protocol, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Add https:// protocol for URLs without protocol
  return `https://${url}`;
}

/**
 * Extracts and normalizes the first URL found in a text string
 * @param text - The text to search for URLs
 * @returns The normalized URL if found, empty string otherwise
 */
export function extractUrlFromText(text: string): string {
  if (!text || !URL_REGEX.test(text)) {
    return '';
  }

  const matchedUrl = text.match(URL_REGEX)?.[0];
  return matchedUrl ? normalizeUrl(matchedUrl) : '';
}
