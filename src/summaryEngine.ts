/*
 * === summaryEngine.ts ===
 * Purpose: Build note summaries by scanning the vault.
 * Dependencies: obsidian, utils.ts
 * Output: NoteSummary interface and SummaryEngine class
 * ---
 */
import { App, TFile } from 'obsidian';
import { extractKeywords, readingTime, wordCount } from './utils';

export interface NoteSummary {
    file: TFile;
    title: string;
    tags: string[];
    wordCount: number;
    readingTime: number;
    keywords: string[];
}

/**
 * 🧠 Collects vault notes into quick-read summaries.
 */
export default class SummaryEngine {
    private app: App;

    /**
     * Creates the engine bound to a specific Obsidian app instance.
     */
    constructor(app: App) {
        this.app = app;
    }

    /**
     * 🧠 Builds summaries for every Markdown file in the vault.
     */
    async indexVault(): Promise<NoteSummary[]> {
        const files = this.app.vault.getMarkdownFiles();
        const summaries: NoteSummary[] = [];
        for (const file of files) {
            const content = await this.app.vault.cachedRead(file);
            const fm = this.app.metadataCache.getFileCache(file)?.frontmatter ?? {};
            const tags = Array.isArray(fm.tags)
                ? fm.tags
                : typeof fm.tags === 'string'
                ? [fm.tags]
                : [];
            const title = fm.title || file.basename;
            const wc = wordCount(content);
            const rt = readingTime(content);
            const keywords = extractKeywords(content);
            summaries.push({ file, title, tags, wordCount: wc, readingTime: rt, keywords });
        }
        return summaries;
    }
}
