import { ItemView, WorkspaceLeaf } from "obsidian";
import { DojoSettings } from "src/settings";
import { Root, createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { viewTypeTimeline } from "src/constants";
import { ComponentContext } from "src/types";
import TimelineView from "src/component/TimelineView";

export default class TimelineItemView extends ItemView {
  root: Root | null = null;
  //TODO: Add types
  constructor(
    leaf: WorkspaceLeaf,
    private readonly settings: () => DojoSettings,
    private readonly componentContext: ComponentContext,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return viewTypeTimeline;
  }
  getDisplayText(): string {
    return "Timeline View"
  }

  getIcon(): string {
    return this.settings().timelineIcon;
  }
  async onOpen() {
    this.root = createRoot(this.containerEl.children[1]);
    this.root.render(
      <StrictMode>
        <TimelineView />
      </StrictMode>
    );
  }

  async onClose() {
    this.root?.unmount();
  }
}