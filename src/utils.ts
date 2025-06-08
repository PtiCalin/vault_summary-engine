// === utils.ts ===
// Purpose: Helper functions for analyzing text
// Dependencies: none
// Output: wordCount, readingTime, extractKeywords
// ---
/**
 * 🧠 Tallies how many words appear in the supplied text.
 *
 * Splits on whitespace and drops any empty pieces so you get an
 * accurate snapshot of length.
 *
 * @param text - Content to measure.
 * @returns Total number of word tokens.
 */
export function wordCount(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
}

/**
 * 🧠 Estimates how long the text takes to read.
 *
 * Uses `wordCount` with a default speed of 200 words per minute.
 *
 * @param text - The text to analyse.
 * @param wordsPerMinute - Speed used for the estimate. Defaults to 200.
 * @returns Approximate minutes needed to read the text.
 */
export function readingTime(text: string, wordsPerMinute = 200): number {
    return Math.ceil(wordCount(text) / wordsPerMinute);
}

/**
 * 🧠 Digs out high-frequency terms from a block of text.
 *
 * Non-word characters are stripped and only words longer than three
 * letters are considered.
 *
 * @param text - The text to analyse.
 * @param limit - Maximum number of keywords to return. Defaults to 5.
 * @returns Ranked keywords in lower case.
 */
export function extractKeywords(text: string, limit = 5): string[] {
    const words = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 3);
    const freq: Record<string, number> = {};
    for (const word of words) {
        freq[word] = (freq[word] || 0) + 1;
    }
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([word]) => word);
}
