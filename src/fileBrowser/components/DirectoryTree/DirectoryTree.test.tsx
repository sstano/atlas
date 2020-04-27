import React from "react";
import { shallow, mount } from "enzyme";
import { Spin, Menu, Empty } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import DirectoryTree from ".";
import DirectoryItem, { DirectoryItemType } from "../../../types/DirectoryItem";

describe("DirectoryTree component", () => {
  test("should render loading spinner when loading the initial data", () => {
    const mockHandler = () => null;
    const wrapper = shallow(
      <DirectoryTree
        isLoading
        files={null}
        onFolderOpened={mockHandler}
        onFileOpened={mockHandler}
      />
    );

    expect(wrapper.exists(Spin)).toEqual(true);
    expect(wrapper.exists(Menu)).toEqual(false);
    expect(wrapper.exists(Empty)).toEqual(false);
  });

  test("should render empty state if not loading and no data available", () => {
    const mockHandler = () => null;
    const wrapper = shallow(
      <DirectoryTree
        isLoading={false}
        files={null}
        onFolderOpened={mockHandler}
        onFileOpened={mockHandler}
      />
    );

    expect(wrapper.exists(Spin)).toEqual(false);
    expect(wrapper.exists(Menu)).toEqual(false);
    expect(wrapper.exists(Empty)).toEqual(true);
  });

  test("should render the loaded content", () => {
    const mockHandler = () => null;
    const mockFiles: Record<string, DirectoryItem> = {
      root: {
        id: "root",
        name: "",
        type: DirectoryItemType.FOLDER,
        childrenIDs: ["test1", "test2", "folder1"],
      },
      test1: { id: "test1", name: "File 1", type: DirectoryItemType.FILE },
      test2: { id: "test2", name: "File 2", type: DirectoryItemType.FILE },
      folder1: {
        id: "folder1",
        name: "Folder 1",
        type: DirectoryItemType.FOLDER,
      },
    };
    const wrapper = shallow(
      <DirectoryTree
        isLoading={false}
        files={mockFiles}
        onFolderOpened={mockHandler}
        onFileOpened={mockHandler}
      />
    );

    expect(wrapper.exists(Spin)).toEqual(false);
    expect(wrapper.exists(Menu)).toEqual(true);
    expect(wrapper.find(Menu.Item).length).toEqual(2);
    expect(wrapper.find(Menu.SubMenu).length).toEqual(1);
    expect(wrapper.exists(Empty)).toEqual(false);
  });

  describe("selecting tree view item", () => {
    const mockFiles: Record<string, DirectoryItem> = {
      root: {
        id: "root",
        name: "",
        type: DirectoryItemType.FOLDER,
        childrenIDs: ["file1", "folder1"],
      },
      file1: { id: "file1", name: "File 1", type: DirectoryItemType.FILE },
      folder1: {
        id: "folder1",
        name: "Folder 1",
        type: DirectoryItemType.FOLDER,
      },
    };

    test("should handle clicking on a file", () => {
      const mockFileClickHandler = jest.fn();
      const mockFolderClickHandler = jest.fn();

      const wrapper = mount(
        <DirectoryTree
          isLoading={false}
          files={mockFiles}
          onFileOpened={mockFileClickHandler}
          onFolderOpened={mockFolderClickHandler}
        />
      );

      wrapper.find(Menu.Item).at(0).simulate("click");

      expect(mockFolderClickHandler).not.toHaveBeenCalled();
      expect(mockFileClickHandler).toHaveBeenCalledTimes(1);
      expect(mockFileClickHandler).toHaveBeenCalledWith("file1");
    });

    test("should handle clicking on a folder", () => {
      const mockFileClickHandler = jest.fn();
      const mockFolderClickHandler = jest.fn();

      const wrapper = mount(
        <DirectoryTree
          isLoading={false}
          files={mockFiles}
          onFileOpened={mockFileClickHandler}
          onFolderOpened={mockFolderClickHandler}
        />
      );

      const onTitleClick = wrapper.find(SubMenu).at(0).prop("onTitleClick");
      if (onTitleClick) {
        onTitleClick({} as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      }

      expect(mockFileClickHandler).not.toHaveBeenCalled();
      expect(mockFolderClickHandler).toHaveBeenCalledTimes(1);
      expect(mockFolderClickHandler).toHaveBeenCalledWith("folder1");
    });
  });
});
