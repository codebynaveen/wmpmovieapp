/**
 * Converts an array of numbers to a comma-separated string.
 * @param numbers - Array of numbers to convert.
 * @returns A comma-separated string of numbers.
 */
export function numbersArrayToString(numbers: number[]): string {
  return numbers.join(',');
}

/**
 * Extracts numeric IDs from an array of character URLs.
 * @param urls - Array of character URLs.
 * @returns An array of IDs as numbers.
 */
export function extractIdsFromUrls(urls: string[]): number[] {
  return urls.map(url => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
  });
}
