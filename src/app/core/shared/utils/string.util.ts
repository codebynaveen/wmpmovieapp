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

/**
 * Generates a comma-separated string of numbers within a specified range.
 * @param start - The starting number of the range.
 * @param end - The ending number of the range.
 * @returns A comma-separated string of numbers from start to end.
 */
export function generateRangeString(start: number, end: number): string {
  let result = '';
  for (let i = start; i <= end; i++) {
    result += i;
    if (i < end) {
      result += ',';
    }
  }
  return result;
}

/**
 * Extracts the season number from a formatted string (e.g., "S01E01").
 * @param episodeCode - The episode code string.
 * @returns The season number as a number.
 */
export function extractSeasonNumber(episodeCode: string): number {
  return parseInt(episodeCode.split('E')[0].replace('S', ''), 10);
}

/**
 * Extracts the episode number from a formatted string (e.g., "S01E01").
 * @param episodeCode - The episode code string.
 * @returns The episode number as a number.
 */
export function extractEpisodeNumber(episodeCode: string): number {
  console.log(parseInt(episodeCode.split('E')[1], 10));
  return parseInt(episodeCode.split('E')[1], 10);
}
