import { Plugin } from "obsidian";
import { ModeWatermarkSettingTab } from "settings";

export default class ModeWatermarkPlugin extends Plugin {
	onload() {
		this.addSettingTab(new ModeWatermarkSettingTab(this.app, this));
	}
}
