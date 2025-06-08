// === summaryEngine.ts ===
// Purpose: Build note summaries by scanning the vault
// Dependencies: obsidian, utils.ts
// Output: NoteSummary interface and SummaryEngine class
// ---
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
 * 🧠 Syncs metadata from vault notes into quick-read summaries.
 *
 * Walks through Markdown files and surfaces keywords, word counts and
 * reading time so other components can show a concise preview.
 */
export default class SummaryEngine {
    private app: App;

    /**
     * 🧠 Binds the engine to the Obsidian app instance so we can poke at
     * the vault.
     */
    constructor(app: App) {
        this.app = app;
    }

    /**
     * 🧠 Walks every Markdown file and assembles a summary record.
     *
     * Each summary bundles title, tags, word count, reading time and
     * a set of keywords.
     */
    async indexVault(): Promise<NoteSummary[]> {
        const files = this.app.vault.getMarkdownFiles();
        const summaries: NoteSummary[] = [];
        for (const file of files) {
            let content: string;
            try {
                content = await this.app.vault.cachedRead(file);
            } catch (err) {
                console.warn(`⚠️ Could not read ${file.path}`);
                continue;
            }
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
