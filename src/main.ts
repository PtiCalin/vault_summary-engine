import { Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import SummaryEngine from './summaryEngine';
import { SummaryPanel, VIEW_TYPE_SUMMARY } from './uiPanel';

interface VaultSummarySettings {
    includeFolders: string;
}

const DEFAULT_SETTINGS: VaultSummarySettings = {
    includeFolders: ''
};

export default class VaultSummaryEnginePlugin extends Plugin {
    settings: VaultSummarySettings;
    engine!: SummaryEngine;

    async onload() {
        await this.loadSettings();
        this.engine = new SummaryEngine(this.app);

        this.registerView(VIEW_TYPE_SUMMARY, leaf => new SummaryPanel(leaf, this.engine));

        this.addRibbonIcon('document', 'Open Vault Summary', () => {
            this.activateView();
        });

        this.addCommand({
            id: 'refresh-vault-summary',
            name: 'Refresh Vault Summary',
            callback: async () => {
                const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_SUMMARY);
                for (const leaf of leaves) {
                    await (leaf.view as SummaryPanel).onOpen();
                }
            }
        });

        this.addSettingTab(new SummarySettingTab(this.app, this));
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_SUMMARY);
    }

    async activateView() {
        await this.app.workspace.getRightLeaf(false).setViewState({ type: VIEW_TYPE_SUMMARY, active: true });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class SummarySettingTab extends PluginSettingTab {
    plugin: VaultSummaryEnginePlugin;

    constructor(app: any, plugin: VaultSummaryEnginePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Vault Summary Engine Settings' });

        new Setting(containerEl)
            .setName('Included folders')
            .setDesc('Comma separated list of folders to index')
            .addText(text =>
                text
                    .setPlaceholder('folder1, folder2')
                    .setValue(this.plugin.settings.includeFolders)
                    .onChange(async value => {
                        this.plugin.settings.includeFolders = value;
                        await this.plugin.saveSettings();
                    })
            );
    }
}
