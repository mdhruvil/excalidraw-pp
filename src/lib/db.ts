import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import Dexie from "dexie";

export interface File {
  id?: number;
  name: string;
  createdAt: Date;
  data?: FileType;
}
// Here More types will be added in future
export type FileType = {
  elements: ExcalidrawElement[];
  appState: AppState;
  files: BinaryFiles;
};

class CustomDexie extends Dexie {
  files!: Dexie.Table<File, number>;
  constructor() {
    super("excalidraw++");
    this.version(1).stores({
      files: "++id, name, createdAt",
    });
  }
}

export const db = new CustomDexie();
