// === uiPanel.ts ===
// Purpose: Render the vault summary panel view.
// Dependencies: obsidian, summaryEngine.ts
// Output: SummaryPanel class and VIEW_TYPE_SUMMARY constant
// ---
import { ItemView, WorkspaceLeaf } from 'obsidian';
import SummaryEngine, { NoteSummary } from './summaryEngine';

export const VIEW_TYPE_SUMMARY = 'vault-summary-view';

export class SummaryPanel extends ItemView {
    private engine: SummaryEngine;

    constructor(leaf: WorkspaceLeaf, engine: SummaryEngine) {
        super(leaf);
        this.engine = engine;
    }

    getViewType(): string {
        return VIEW_TYPE_SUMMARY;
    }

    getDisplayText(): string {
        return 'Vault Summary';
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl('h2', { text: 'Vault Summary' });
        const summaries = await this.engine.indexVault();
        this.renderSummaries(container, summaries);
    }

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
