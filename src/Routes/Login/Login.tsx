import React, { useEffect, useState, useMemo } from "react";
// import raw_data from "../../lib/assets/backlog/current/filtered_parentId3.json";
import cur_raw from "../../lib/assets/backlog/raw/filtered3.json"
import new_data from "../../lib/assets/backlog/raw/filtered_excel3.json";
import raw_data from "../../lib/assets/backlog/current/test.json"
import RenderTree from "../../Components/RenderTree";
import PDFRestructure, {
  FilterNull,
  SectionRelation,
  TagsHierarchy,
  addIndex,
  buildTree,
  downloadExcel,
  downloadJsonFile,
  sortPDFRows,
} from "../../lib/PDFRestructure";
import RenderSecion from "../../Components/RenderSection";

const Login = () => {
  const [data, setData] = useState<any>(raw_data);
  useEffect(() => {
    setData(sortPDFRows(data));
  }, []);

  const [expanded, setExpanded] = useState<any>([]);
  const handleOpen = (section: string) => {
    let temp = [...expanded];
    if (!temp.includes(section)) {
      temp.push(section);
    }
    setExpanded(temp);
  };
  
  const handleClose = (section: string) => {
    let temp = [...expanded];
    const index = temp.indexOf(section);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setExpanded(temp);
  };

  return (
    <div>
      <button onClick={() => downloadJsonFile(data, "filtered_index3.json")}>
        Download JSON
      </button>
      <button onClick={() => downloadExcel(new_data)}>
        Download As Excel
      </button>
    </div>
  );
};

export default Login;
