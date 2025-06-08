// === utils.ts ===
// Purpose: Helper functions for analyzing text.
// Dependencies: none
// Output: wordCount, readingTime, extractKeywords
// ---
export function wordCount(text: string): number {
    return text.split(/\s+/).filter(Boolean).length;
}

export function readingTime(text: string, wordsPerMinute = 200): number {
    return Math.ceil(wordCount(text) / wordsPerMinute);
}

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
