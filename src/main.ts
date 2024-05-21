import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import { CONTEXT_KEY_OBSIDIAN_FACADE, VIEW_TYPE_TIMELINE } from './constants';
import TimelineView from './ui/timeline-view';
import { DojoSettings } from './settings';
import { ObsidianFacade } from './service/obsidian-facade';

const DEFAULT_SETTINGS: DojoSettings = {
	timelineIcon: 'calendar-clock',
	testText: 'Hello, World!'
}

export default class Dojo extends Plugin {
	settings: DojoSettings;
	obsidianFacade: ObsidianFacade;

	async onload() {
		await this.loadSettings();

		this.obsidianFacade = new ObsidianFacade(this.app);
		this.registerViews();
		this.addRibbonIcon('calendar-clock', 'Go schedule!', this.initTimeLineLeaf);
		this.addSettingTab(new SettingTab(this.app, this));
		this.initTimeLineSilently();
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_TIMELINE);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async initTimeLineSilently() {
		const rightLeaf = this.app.workspace.getRightLeaf(false);
		if (rightLeaf) {
			await rightLeaf.setViewState({
				type: VIEW_TYPE_TIMELINE,
				active: false,
			});
		}
		this.app.workspace.rightSplit.expand();
	}

	initTimeLineLeaf = async () =>{
		const timelineLeaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_TIMELINE)[0];
		if (timelineLeaf) {
			this.app.workspace.revealLeaf(timelineLeaf);
			return;
		}

		this.app.workspace.detachLeavesOfType(VIEW_TYPE_TIMELINE);
		const rightLeaf = this.app.workspace.getRightLeaf(false);
		if (rightLeaf) {
			await rightLeaf.setViewState({
				type: VIEW_TYPE_TIMELINE,
				active: true,
			});
		}
		this.app.workspace.rightSplit.expand();

	}

	private registerViews() {
		const componentContext = new Map<string, unknown>();
		componentContext.set(CONTEXT_KEY_OBSIDIAN_FACADE, this.obsidianFacade);
		this.registerView(
			VIEW_TYPE_TIMELINE,
			(leaf: WorkspaceLeaf) =>
			  new TimelineView(leaf, () => this.getSettings(), componentContext)
		  );
	}

	private getSettings() {
		if (this.settings === undefined) {
			this.settings = DEFAULT_SETTINGS;
		}
		return this.settings;
	}
}

class SettingTab extends PluginSettingTab {
	plugin: Dojo;

	constructor(app: App, plugin: Dojo) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.testText)
				.onChange(async (value) => {
					this.plugin.settings.testText = value;
					await this.plugin.saveSettings();
				}));
	}
}
