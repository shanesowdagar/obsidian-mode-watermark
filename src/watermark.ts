import { App, MarkdownView, WorkspaceLeaf } from "obsidian";

const ACTIVE_LEAF_CLASS = "mode-watermark-active-leaf";
const EDIT_MODE_CLASS = "mode-watermark-edit-mode";

export function syncModeWatermarkClasses(app: App): void {
	const activeLeaf = app.workspace.getMostRecentLeaf();

	for (const leaf of app.workspace.getLeavesOfType("markdown")) {
		updateLeafClasses(leaf, leaf === activeLeaf);
	}
}

export function clearModeWatermarkClasses(app: App): void {
	for (const leaf of app.workspace.getLeavesOfType("markdown")) {
		for (const target of getClassTargets(leaf)) {
			target.classList.remove(ACTIVE_LEAF_CLASS, EDIT_MODE_CLASS);
		}
	}
}

function updateLeafClasses(leaf: WorkspaceLeaf, isActive: boolean): void {
	const isEditMode = isActive && getLeafMode(leaf) === "source";

	for (const target of getClassTargets(leaf)) {
		target.classList.toggle(ACTIVE_LEAF_CLASS, isActive);
		target.classList.toggle(EDIT_MODE_CLASS, isEditMode);
	}
}

function getLeafMode(leaf: WorkspaceLeaf): "source" | "preview" | null {
	if (!(leaf.view instanceof MarkdownView)) return null;
	return leaf.view.getMode();
}

function getClassTargets(leaf: WorkspaceLeaf): HTMLElement[] {
	const viewContainer = leaf.view.containerEl;
	const targets: HTMLElement[] = [viewContainer];

	const leafContent = viewContainer.closest(".workspace-leaf-content");
	if (leafContent instanceof HTMLElement) targets.push(leafContent);

	const workspaceLeaf = viewContainer.closest(".workspace-leaf");
	if (workspaceLeaf instanceof HTMLElement) targets.push(workspaceLeaf);

	return targets;
}
