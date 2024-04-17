import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import { viewTypeTimeline } from './constants';
import TimelineView from './ui/timeline-view';
import { DojoSettings } from './settings';

//TODO: Remember to rename these classes and interfaces!
const DEFAULT_SETTINGS: DojoSettings = {
	timelineIcon: 'calendar-clock',
	testText: 'Hello, World!'
}

export default class Dojo extends Plugin {
	settings: DojoSettings;

	async onload() {
		await this.loadSettings();
		this.registerViews();
		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('calendar-clock', 'Go schedule!', this.initTimeLineLeaf);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		this.initTimeLineSilently();
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType(viewTypeTimeline);
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
				type: viewTypeTimeline,
				active: false,
			});
		}
		this.app.workspace.rightSplit.expand();
	}

	initTimeLineLeaf = async () =>{
		const timelineLeaf = this.app.workspace.getLeavesOfType(viewTypeTimeline)[0];
		if (timelineLeaf) {
			this.app.workspace.revealLeaf(timelineLeaf);
			return;
		}

		this.app.workspace.detachLeavesOfType(viewTypeTimeline);
		const rightLeaf = this.app.workspace.getRightLeaf(false);
		if (rightLeaf) {
			await rightLeaf.setViewState({
				type: viewTypeTimeline,
				active: true,
			});
		}
		this.app.workspace.rightSplit.expand();

	}

	private registerViews() {
		this.registerView(
			viewTypeTimeline,
			(leaf: WorkspaceLeaf) =>
			  new TimelineView(leaf, () => this.getSettings(), new Map())
		  );
	}

	private getSettings() {
		if (this.settings === undefined) {
			this.settings = DEFAULT_SETTINGS;
		}
		return this.settings;
	}
}


class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
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
