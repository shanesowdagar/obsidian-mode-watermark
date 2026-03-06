import { App, Plugin, PluginSettingTab } from "obsidian";
import { ModeWatermarkSettingTab } from "settings";

export default class ModeWatermarkPlugin extends Plugin {
	async onload() {
		this.addSettingTab(new ModeWatermarkSettingTab(this.app, this));
	}
}
