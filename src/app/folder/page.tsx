"use client";
import React from "react";

const entity:Entity[] = [
  {
    type: "folder",
    name: "folder 1",
    entities: [
      {
        type: "folder",
        name: "folder 2",
        entities: [],
      },
      {
        type: "file",
        name: "file2",
        data: "data3",
      },
      {
        type: "folder",
        name: "folder 1",
        entities: [
          {
            type: "folder",
            name: "folder 2",
            entities: [],
          },
          {
            type: "file",
            name: "file2",
            data: "data3",
          },
        ],
      },
    ],
  },
  {
    type: "file",
    name: "file 4",
    data: "data 5",
  },
];
type FileEntity = {
  type: "file";
  name: string;
  data: string;
};

type FolderEntity = {
  type: "folder";
  name: string;
  entities: Entity[];
};

type Entity = FileEntity | FolderEntity;

type Props = {
  parentPath:string,
  entities:Entity[]
}

const Folder = (props:Props) => {
  const { entities, parentPath = "" } = props;
  const [openedFolders, setOpenedFolders] = React.useState<
    Record<string, boolean>
  >({});

  const handleOpen = (name: string) => {
    setOpenedFolders((prev) => {
      const prevState = prev[name];
      return { ...prev, [name]: !prevState };
    });
  };

  return (
    <ul style={ulStyle}>
      {entities.map((entity, index) => {
        const uniqueKey = `${parentPath}/${entity.name}-${index}`;
        if (entity.type === "file") {
          return (
            <li style={{ ...listStyle, ...fileStyle }} key={uniqueKey}>
              📄 {entity.name}
            </li>
          );
        }

        const entities = entity.entities || [];
        const isOpen = openedFolders[entity.name];

        return (
          <li style={{ ...listStyle, ...folderStyle }} key={uniqueKey}>
            <button
              style={{
                ...buttonStyle,
                fontWeight: isOpen ? "600" : "normal",
              }}
              type="button"
              onClick={() => handleOpen(entity.name)}
            >
              {isOpen ? "📂" : "📁"} {entity.name}
            </button>
            {isOpen && (
              <div style={indentStyle}>
                <Folder entities={entities} parentPath={uniqueKey} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Page = () => {
  const [entities, setEntities] = React.useState(entity);
  return <Folder entities={entities} parentPath=""/>;
};
export default Page;

const ulStyle: React.CSSProperties = {
  paddingLeft: "10px",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  margin: "6px 0",
};

const buttonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  padding: 0,
  fontSize: "1rem",
  cursor: "pointer",
  color: "#2563eb",
};

const fileStyle: React.CSSProperties = {
  color: "#111",
};

const folderStyle: React.CSSProperties = {
  color: "#1d4ed8",
};

const indentStyle: React.CSSProperties = {
  marginLeft: "20px",
  borderLeft: "1px dashed #ddd",
  paddingLeft: "10px",
};
