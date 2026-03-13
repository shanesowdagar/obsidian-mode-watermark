import { MarkdownView, Platform, Plugin } from "obsidian";
import { ModeWatermarkSettingTab } from "./settings";
import {
	clearModeWatermarkClasses,
	syncModeWatermarkClasses,
} from "./watermark";

export default class ModeWatermarkPlugin extends Plugin {
	private lastMode: string | null = null;

	async onload() {
		this.addSettingTab(new ModeWatermarkSettingTab(this.app, this));

		const syncWatermarks = () => syncModeWatermarkClasses(this.app);

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", syncWatermarks),
		);
		this.registerEvent(
			this.app.workspace.on("layout-change", syncWatermarks),
		);
		this.registerEvent(this.app.workspace.on("file-open", syncWatermarks));
		this.registerDomEvent(window, "resize", syncWatermarks);

		if (Platform.isMobile) {
			this.registerInterval(
				window.setInterval(() => {
					const leaf = this.app.workspace.getMostRecentLeaf();
					const view = leaf?.view;
					const mode =
						view instanceof MarkdownView ? view.getMode() : null;

					if (mode !== this.lastMode) {
						this.lastMode = mode;
						syncWatermarks();
					}
				}, 400),
			);
		}

		syncWatermarks();
	}

	onunload() {
		clearModeWatermarkClasses(this.app);
	}
}
