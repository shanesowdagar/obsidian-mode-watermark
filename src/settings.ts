import { App, PluginSettingTab } from "obsidian";
import ModeWatermarkPlugin from "./main";

export class ModeWatermarkSettingTab extends PluginSettingTab {
	plugin: ModeWatermarkPlugin;

	constructor(app: App, plugin: ModeWatermarkPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.addClass("mode-watermark-settings");

		const card = containerEl.createDiv({
			cls: "mode-watermark-settings-card",
		});

		// ── Badge ─────────────────────────────────────────────────────────────
		const badge = card.createDiv({ cls: "mode-watermark-settings-badge" });
		badge.createDiv({ cls: "mode-watermark-settings-badge-dot" });
		badge.createSpan({ text: "Plugin Active" });

		// ── Title ─────────────────────────────────────────────────────────────
		const title = card.createDiv({ cls: "mode-watermark-settings-title" });
		title.appendText("Mode ");
		title.createEl("em", {
			cls: "mode-watermark-settings-title-em",
			text: "Watermark",
		});

		// ── Subtitle ──────────────────────────────────────────────────────────
		card.createEl("p", {
			cls: "mode-watermark-settings-subtitle",
			text: "A subtle indicator, always there when you need it.",
		});

		// ── Divider ───────────────────────────────────────────────────────────
		card.createDiv({ cls: "mode-watermark-settings-divider" });

		// ── Thanks ────────────────────────────────────────────────────────────
		const thanks = card.createEl("p", {
			cls: "mode-watermark-settings-thanks",
		});
		thanks.appendText("Thanks for installing ");
		thanks.createEl("strong", {
			cls: "mode-watermark-settings-thanks-name",
			text: "Mode watermark",
		});
		thanks.appendText(".");

		card.createEl("p", {
			cls: "mode-watermark-settings-description",
			text: "Shows a faint watermark when you're in edit mode.",
		});

		// ── Footer ────────────────────────────────────────────────────────────
		card.createDiv({ cls: "mode-watermark-settings-divider" });

		const footer = card.createDiv({
			cls: "mode-watermark-settings-footer",
		});
		footer.createSpan({
			cls: "mode-watermark-settings-version",
			text: `v${this.plugin.manifest.version}`,
		});

		const heart = footer.createSpan({
			cls: "mode-watermark-settings-heart",
		});
		heart.appendText("made with ");
		heart.createEl("span", {
			cls: "mode-watermark-settings-heart-icon",
			text: "♥",
		});
		heart.appendText(" for obsidian");
	}
}
