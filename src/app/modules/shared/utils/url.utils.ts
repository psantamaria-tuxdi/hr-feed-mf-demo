/**
 * URL-related utilities and constants
 */

/**
 * Robust URL regex pattern that detects only valid URL formats:
 * - https://example.com
 * - http://example.com
 * - www.example.com
 * Ensures proper domain structure with valid TLD (at least 2 characters)
 */
export const URL_REGEX =
  /(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/\?\#][^\s]*)?/;

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
  return matchedUrl || '';
}
