import createNextFileMap from "./createNextFileMap";
import DirectoryItem, { DirectoryItemType } from "../../types/DirectoryItem";

describe("createNextFileMap", () => {
  test("should the next version of the file map", () => {
    const folderContent: DirectoryItem[] = [
      { id: "folder1", name: "F1", type: DirectoryItemType.FOLDER },
      { id: "file1", name: "file1", type: DirectoryItemType.FILE },
    ];
    const currentFileMap = {
      parent1: { id: "parent1", name: "P1", type: DirectoryItemType.FOLDER },
      parent2: { id: "parent2", name: "P2", type: DirectoryItemType.FOLDER },
      parentFile1: {
        id: "parentFile1",
        name: "parent File1",
        type: DirectoryItemType.FILE,
      },
    };

    expect(createNextFileMap(currentFileMap, "parent2", folderContent)).toEqual(
      {
        parent1: { id: "parent1", name: "P1", type: DirectoryItemType.FOLDER },
        parent2: {
          id: "parent2",
          name: "P2",
          type: DirectoryItemType.FOLDER,
          childrenIDs: ["folder1", "file1"],
        },
        parentFile1: {
          id: "parentFile1",
          name: "parent File1",
          type: DirectoryItemType.FILE,
        },
        folder1: { id: "folder1", name: "F1", type: DirectoryItemType.FOLDER },
        file1: { id: "file1", name: "file1", type: DirectoryItemType.FILE },
      }
    );
  });
});
