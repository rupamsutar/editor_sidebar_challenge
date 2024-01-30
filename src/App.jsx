import { useEffect, useState } from "react";
import "./App.css";

const FileStructure = ({ type, title, children }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [updatedChildren, setUpdatedChildren] = useState(children);
  const [addField, showAddField] = useState(null);
  return (
    <>
      <div className="ml-5  px-2 py-1 w-fit">
        {addField && (
          <div className="flex">
            form
            <input type="text" />
          </div>
        )}
        <div
          className="flex gap-10 border-2 border-gray-400"
          onClick={(e) => {
            if (e.target.tagName === "DIV") setShowChildren(!showChildren);
          }}
        >
          <div
            className={`${type === "folder" && "bg-red-400"} ${
              type === "file" && "bg-blue-400"
            }`}
          >
            {type}
          </div>
          <div className="">{title}</div>
          <button>Add File</button>
          <button>Add Folder</button>
        </div>
        {showChildren &&
          children?.map((el, i) => {
            return <FileStructure key={i} {...el} />;
          })}
      </div>
    </>
  );
};

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/constants.json").then((res) => {
      res.json().then((newRes) => {
        setData(newRes);
      });
    });
  }, []);

  return (
    <>
      {data.map((el, i) => {
        return <FileStructure key={i} {...el} />;
      })}
    </>
  );
}

export default App;
