import { App, MarkdownView, WorkspaceLeaf } from "obsidian";

const ACTIVE_LEAF_CLASS = "mode-watermark-active-leaf";
const EDIT_MODE_CLASS = "mode-watermark-edit-mode";

export function syncModeWatermarkClasses(app: App): void {
	const activeLeaf = app.workspace.activeLeaf;

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
	const mode = getLeafMode(leaf);
	const isEditMode = mode === "source";

	for (const target of getClassTargets(leaf)) {
		target.classList.toggle(ACTIVE_LEAF_CLASS, isActive);
		target.classList.toggle(EDIT_MODE_CLASS, isActive && isEditMode);
	}
}

function getLeafMode(leaf: WorkspaceLeaf): "source" | "preview" | null {
	if (!(leaf.view instanceof MarkdownView)) {
		return null;
	}

	return leaf.view.getMode();
}

function getClassTargets(leaf: WorkspaceLeaf): HTMLElement[] {
	const targets = new Set<HTMLElement>();
	const viewContainer = leaf.view.containerEl;

	targets.add(viewContainer);

	const leafContent = viewContainer.closest(".workspace-leaf-content");
	if (leafContent instanceof HTMLElement) {
		targets.add(leafContent);
	}

	const workspaceLeaf = viewContainer.closest(".workspace-leaf");
	if (workspaceLeaf instanceof HTMLElement) {
		targets.add(workspaceLeaf);
	}

	return [...targets];
}
