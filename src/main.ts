import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import {
	DEFAULT_SETTINGS,
	MyPluginSettings,
	SampleSettingTab,
} from "./settings";

// Remember to rename these classes and interfaces!

export default class ModeWatermarkPlugin extends Plugin {
	// settings: MyPluginSettings;

	async onload() {
		this.addSettingTab(new ModeWatermarkSettingTab(this.app, this));
		this.injectStyles();
		console.log("ModeWatermarkPlugin loaded");
		new Notice("ModeWatermarkPlugin loaded");

		// await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
		this.removeStyles();
		console.log("ModeWatermarkPlugin unloaded");
		new Notice("ModeWatermarkPlugin unloaded");
	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<MyPluginSettings>);
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }

	private styleEl: HTMLStyleElement | null = null;

	injectStyles() {
		if (this.styleEl) return; // already injected

		this.styleEl = document.createElement("style");
		this.styleEl.id = "mode-watermark-style";

		this.styleEl.textContent = `
/* Editing mode */
.markdown-source-view {
    background-color: #1a1a1a !important;
    position: relative;
}

/* Source Mode Watermark */
.markdown-source-view::before {
    content: "EDIT MODE";
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10rem;
    font-weight: 800;
    letter-spacing: 8px;
    text-align: center;
    color: rgba(255, 255, 255, 0.03);
    pointer-events: none;
    z-index: 0;
    word-wrap: normal;
}

/* Laptop / Tablet */
@media (max-width: 1199px) and (min-width: 769px) {
    .markdown-source-view::before {
        font-size: 6rem;
        letter-spacing: 4px;
    }
}

/* Mobile */
@media (max-width: 768px) {
    .markdown-source-view::before {
        font-size: 2rem;
        letter-spacing: 4px;
    }
}
    `;

		document.head.appendChild(this.styleEl);
	}

	removeStyles() {
		if (this.styleEl) {
			this.styleEl.remove();
			this.styleEl = null;
		}
	}
}

class ModeWatermarkSettingTab extends PluginSettingTab {
	plugin: ModeWatermarkPlugin;

	constructor(app: App, plugin: ModeWatermarkPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", {
			text: "Mode Watermark Sample Settings - STILL IN DEV ⚠️",
		});

		// ---------------- Sample Toggle ----------------
		new Setting(containerEl)
			.setName("Enable Watermark")
			.setDesc("Toggle the EDIT MODE watermark")
			.addToggle((toggle) => {
				toggle.setValue(true);
				toggle.onChange((value) =>
					console.log("Watermark toggle:", value),
				);
			});

		// ---------------- Sample Checkbox ----------------
		new Setting(containerEl)
			.setName("Show Grid Lines")
			.setDesc("Just a sample checkbox")
			.addToggle((toggle) => {
				toggle.setValue(false);
				toggle.onChange((value) => console.log("Grid Lines:", value));
			});

		// ---------------- Sample Text Input ----------------
		new Setting(containerEl)
			.setName("Custom Text")
			.setDesc("Type something here")
			.addText((text) => {
				text.setPlaceholder("EDIT MODE").onChange((value) =>
					console.log("Custom Text:", value),
				);
			});

		// ---------------- Sample Color Picker ----------------
		new Setting(containerEl)
			.setName("Watermark Color")
			.setDesc("Pick a sample color")
			.addColorPicker((picker) => {
				picker
					.setValue("#ffffff")
					.onChange((value) => console.log("Color picked:", value));
			});

		// ---------------- Buy Me a Coffee Button ----------------
		new Setting(containerEl)
			.setName("Support Developer")
			.setDesc("If you like this plugin, you can support me!")
			.addButton((btn) => {
				btn.setButtonText("Buy Me a Coffee")
					.setCta()
					.onClick(() => {
						window.open(
							"https://www.buymeacoffee.com/yourlink",
							"_blank",
						);
					});
			});
	}
}
