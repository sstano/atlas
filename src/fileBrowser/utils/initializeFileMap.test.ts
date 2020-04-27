import initializeFileMap from "./initializeFileMap";
import DirectoryItem, { DirectoryItemType } from "../../types/DirectoryItem";

describe("initializeFileMap", () => {
  test("should generate the initial file map content with root directory", () => {
    const rootContent: DirectoryItem[] = [
      { id: "folder1", name: "F1", type: DirectoryItemType.FOLDER },
      { id: "folder2", name: "F2", type: DirectoryItemType.FOLDER },
      { id: "file1", name: "file1", type: DirectoryItemType.FILE },
    ];
    expect(initializeFileMap(rootContent)).toEqual({
      root: {
        id: "root",
        name: "",
        type: DirectoryItemType.FOLDER,
        childrenIDs: ["folder1", "folder2", "file1"],
      },
      folder1: { id: "folder1", name: "F1", type: DirectoryItemType.FOLDER },
      folder2: { id: "folder2", name: "F2", type: DirectoryItemType.FOLDER },
      file1: { id: "file1", name: "file1", type: DirectoryItemType.FILE },
    });
  });

  test("should handle empty root directory", () => {
    const rootContent: DirectoryItem[] = [];
    expect(initializeFileMap(rootContent)).toEqual({
      root: {
        id: "root",
        name: "",
        type: DirectoryItemType.FOLDER,
        childrenIDs: [],
      },
    });
  });
});
