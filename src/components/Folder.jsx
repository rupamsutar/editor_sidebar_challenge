import React, { useState } from "react";

export default function Folder({ handlerInsertNode, explorerData }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);

    setShowInput({
      isFolder,
      visible: true,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handlerInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  return (
    <div className="mt-2">
      <div className="folder" onClick={() => setExpand(!expand)}>
        <span>
          {explorerData.isFolder ? "📁" : "🗒️"} {explorerData.name}
        </span>
        {explorerData.isFolder && (
          <div className="flex gap-2">
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        )}
      </div>
      <div className={`${expand ? "block" : "hidden"} pl-5`}>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "🗒️"}</span>
            <input
              type="text"
              onKeyDown={(e) => onAddFolder(e)}
              className="inputContainer__input"
              autoFocus
              onBlur={() => setShowInput({ ...showInput, visible: false })}
            />
          </div>
        )}
        {explorerData.items.map((exp, i) => {
          return (
            <Folder
              handlerInsertNode={handlerInsertNode}
              key={i}
              explorerData={exp}
            />
          );
        })}
      </div>
    </div>
  );
}
