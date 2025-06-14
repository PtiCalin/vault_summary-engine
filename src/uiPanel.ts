// === uiPanel.ts ===
// Purpose: Render the vault summary panel view
// Dependencies: obsidian, summaryEngine.ts
// Output: SummaryPanel class and VIEW_TYPE_SUMMARY constant
// ---
import { ItemView, WorkspaceLeaf } from 'obsidian';
import SummaryEngine, { NoteSummary } from './summaryEngine';

export const VIEW_TYPE_SUMMARY = 'vault-summary-view';

/**
 * 🧠 Presents your summaries inside a handy sidebar panel.
 *
 * Handles rendering of note statistics by teaming up with the
 * `SummaryEngine`.
 */
export class SummaryPanel extends ItemView {
    private engine: SummaryEngine;

    /**
     * 🧠 Stashes the engine instance and wires up the base view.
     */
    constructor(leaf: WorkspaceLeaf, engine: SummaryEngine) {
        super(leaf);
        this.engine = engine;
    }

    /**
     * 🧠 Returns the view type identifier used by Obsidian.
     */
    getViewType(): string {
        return VIEW_TYPE_SUMMARY;
    }

    /**
     * 🧠 Title shown in the workspace tab.
     */
    getDisplayText(): string {
        return 'Vault Summary';
    }

    /**
     * 🧠 Refreshes the panel every time the view opens.
     */
    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl('h2', { text: 'Vault Summary' });
        const summaries = await this.engine.indexVault();
        this.renderSummaries(container, summaries);
    }

    /**
     * 🧠 Inserts summary items into the container element.
     */
    private renderSummaries(container: HTMLElement, summaries: NoteSummary[]) {
        for (const summary of summaries) {
            const item = container.createDiv('summary-item');
            const link = item.createEl('a', {
                text: summary.title,
                href: this.app.metadataCache.fileToLinktext(summary.file, '')
            });
            link.onclick = (evt) => {
                evt.preventDefault();
                this.app.workspace.getLeaf(false).openFile(summary.file);
            };
            item.createSpan({ text: ` – ${summary.wordCount} words, ${summary.readingTime} min read` });
            if (summary.keywords.length > 0) {
                item.createSpan({ text: ` – Keywords: ${summary.keywords.join(', ')}` });
            }
        }
    }
}
