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

		// ── Title (div, not h2, to avoid Obsidian overrides) ──────────────────
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

		// ── Welcome ───────────────────────────────────────────────────────────
		card.createDiv({
			cls: "mode-watermark-settings-welcome-label",
			text: "Welcome",
		});

		const thanks = card.createEl("p", {
			cls: "mode-watermark-settings-thanks",
		});
		thanks.appendText("Thanks for installing ");
		thanks.createEl("strong", {
			cls: "mode-watermark-settings-thanks-name",
			text: "Mode Watermark",
		});
		thanks.appendText(".");

		card.createEl("p", {
			cls: "mode-watermark-settings-description",
			text: "Your editing mode is now always visible at a glance — quiet, unobtrusive, and always clear.",
		});

		// ── Info tiles ────────────────────────────────────────────────────────
		const grid = card.createDiv({ cls: "mode-watermark-settings-grid" });

		const tiles: { label: string; value: string }[] = [
			{ label: "Trigger", value: "Edit & Read mode" },
			{ label: "Style", value: "Subtle overlay" },
		];

		for (const { label, value } of tiles) {
			const tile = grid.createDiv({
				cls: "mode-watermark-settings-tile",
			});
			tile.createDiv({
				cls: "mode-watermark-settings-tile-label",
				text: label,
			});
			tile.createDiv({
				cls: "mode-watermark-settings-tile-value",
				text: value,
			});
		}

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
