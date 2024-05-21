import { App, FileView, TFile, WorkspaceLeaf } from "obsidian";
import {
    createDailyNote,
    getAllDailyNotes,
    getDailyNote,
} from "obsidian-daily-notes-interface";
import type { Moment } from "moment/moment";

function doesLeafContainFile(leaf: WorkspaceLeaf, file: TFile) {
    const { view } = leaf;
  
    return view instanceof FileView && view.file === file;
  }

export class ObsidianFacade {
    constructor(readonly app: App) { }

    async openFileForDay(moment: Moment) {
        const dailyNote =
            getDailyNote(moment, getAllDailyNotes()) ||
            (await createDailyNote(moment));

        return this.openFileInEditor(dailyNote);
    }
    
    async openFileInEditor(dailyNote: TFile) {
        const leaf = this.app.workspace
            .getLeavesOfType("markdown")
            .find((leaf) => doesLeafContainFile(leaf, dailyNote));
        
        if (leaf) {
            this.app.workspace.setActiveLeaf(leaf);
        } else {
            this.app.workspace.openLinkText(dailyNote.path, "", true);
        }
    }
}