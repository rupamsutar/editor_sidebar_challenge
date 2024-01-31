import React, { useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  function handlerInsertNode(folderId, item, isFolder) {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  }

  return (
    <>
      <Folder
        handlerInsertNode={handlerInsertNode}
        explorerData={explorerData}
      />
    </>
  );
}
