import { ItemView, WorkspaceLeaf } from "obsidian";
import { DojoSettings } from "src/settings";
import { Root, createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { VIEW_TYPE_TIMELINE } from "src/constants";
import TimelineView from "src/component/TimelineView";
import { ComponentContext } from "src/component/ComponentContext";


export default class TimelineItemView extends ItemView {
  root: Root | null = null;
  //TODO: Add types
  constructor(
    leaf: WorkspaceLeaf,
    private readonly settings: () => DojoSettings,
    private readonly componentContext: Map<string, unknown>,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_TIMELINE;
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
        <ComponentContext.Provider value={this.componentContext}>
          <TimelineView />
        </ComponentContext.Provider>
      </StrictMode>
    );
  }

  async onClose() {
    this.root?.unmount();
  }
}