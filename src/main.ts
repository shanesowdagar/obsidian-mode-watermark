import { Platform, Plugin } from "obsidian";
import { ModeWatermarkSettingTab } from "./settings";
import {
	clearModeWatermarkClasses,
	syncModeWatermarkClasses,
} from "./watermark";

export default class ModeWatermarkPlugin extends Plugin {
	async onload() {
		this.addSettingTab(new ModeWatermarkSettingTab(this.app, this));

		const syncWatermarks = () => syncModeWatermarkClasses(this.app);

		this.registerEvent(this.app.workspace.on("active-leaf-change", syncWatermarks));
		this.registerEvent(this.app.workspace.on("layout-change", syncWatermarks));
		this.registerEvent(this.app.workspace.on("file-open", syncWatermarks));
		this.registerDomEvent(window, "resize", syncWatermarks);

		// iOS can skip some view-mode transition events when tabs stay mounted.
		if (Platform.isMobile) {
			this.registerInterval(window.setInterval(syncWatermarks, 400));
		}

		syncWatermarks();
	}

	onunload() {
		clearModeWatermarkClasses(this.app);
	}
}
