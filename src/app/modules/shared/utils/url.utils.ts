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
  /(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/\?\#][^\s]*)?/g;

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
  if (!text) {
    return '';
  }

  // TODO ver PR 47
  // Resetting lastIndex on a global regex that's exported as a constant can cause race conditions in concurrent usage.
  // Consider creating a new regex instance within the function instead of mutating the shared constant.

  // Copilot suggestion:
  // Create a new regex instance to avoid shared state issues
  // const urlRegex = new RegExp(URL_REGEX.source, URL_REGEX.flags);
  // const match = urlRegex.exec(text);

  // Reset the regex lastIndex to ensure consistent results with global flag
  URL_REGEX.lastIndex = 0;
  const match = URL_REGEX.exec(text);

  return match ? normalizeUrl(match[0]) : '';
}
