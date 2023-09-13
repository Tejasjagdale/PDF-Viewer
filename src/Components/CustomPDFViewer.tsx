import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import structured_data2 from "../lib/assets/backlog/raw/filtered3.json";
import structured_data3 from "../lib/assets/backlog/current/filtered_index3.json";
import "./Combined.css";
import HtmlTagMapper from "../lib/HtmlTagMapper";
import ContextMenu from "./Common/ContexMenu";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Annotations from "./Common/Annotations";
import CSSMapper from "../lib/CSSMapper";
import RenderSecion from "./RenderSection";
import { getChild } from "../lib/PDFRestructure";

const CustomPDFViewer = (props: any) => {
  const _ = require("lodash");
  const [curText, setCurText] = useState("");
  const [updated, setUpdated] = useState([]);
  const [data, setData] = useState<any>(structured_data3);
  const [backup, setBackup] = useState<any>([...data]);
  const [curElement, setCurElement] = useState<any>(null);
  const [expanded, setExpanded] = useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>, row_id: any) => {
    event.stopPropagation();
    setAnchorEl(event?.currentTarget);
    const element = event.currentTarget;
    const ele = document.getElementsByClassName("selected");
    if (ele.length) {
      ele[0]?.classList?.remove("selected");
    }

    element?.classList.add("selected");
    setCurElement(row_id);
  };

  const handleEdit = (event: any) => {
    setCurText(event.currentTarget.value);
  };

  const saveEdit = (event: any, row: any) => {
    if (curElement || row === "save") {
      let temp = [...data];

      temp = temp.map((row: any) => {
        if (row.pdf_row_id === curElement)
          if (row.pdf_row_id === curElement) {
            return { ...row, Text: curText };
          }
        return row;
      });
      setData(temp);
    }

    if (row === "save") {
      setAnchorEl(null);
      const ele = document.getElementsByClassName("selected");
      if (ele.length) {
        ele[0]?.classList?.remove("selected");
      }
      setCurElement(null);
    }

    if (row !== "save" && row?.pdf_row_id !== curElement) setCurText(row?.Text);
  };

  useEffect(()=>{
    alert(curElement);
  },[curElement])

  const checkUpdated = (row: any, type: any) => {
    let temp: any = [...backup];
    let temp2: any = [...updated];

    if (type === "delete") {
      temp2 = temp2.filter((data: any) => data.pdf_row_id !== row.pdf_row_id);
      temp2.push(row);
    } else if (type === "update") {
      temp2.map((data2: any) => {
        if (data2.pdf_row_id === row.pdf_row_id) {
          return { ...data2, data: { ...row } };
        }
        return;
      });

      temp.every((data: any) => {
        if (data.pdf_row_id === row.pdf_row_id) {
          let areEqual = _.isEqual(data, row);

          temp2.map((data2: any) => {
            if (data2.pdf_row_id === row.pdf_row_id) {
              areEqual = false;
            }
            return;
          });

          if (!areEqual) {
            temp2.push({ data: { ...row }, type: type });
          }
        }
      });
    } else {
      temp2.push(row);
    }
    setUpdated(temp2);
  };

  useEffect(()=>{
    console.log(updated)
  },[updated])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Annotations
        id={id}
        open={open}
        anchorEl={anchorEl}
        curElement={curElement}
        flag={true}
        data={data}
        setData={setData}
        saveEdit={saveEdit}
        checkUpdated={checkUpdated}
      />
      <div className={`page no1`} style={{ zIndex: 1 }}>
        <RenderSecion
          data={data}
          parentId={-1}
          children={data.filter(
            (section: any) => section.parent_pdf_row_id === -1
          )}
          expanded={expanded}
          handleClose={handleClose}
          handleOpen={handleOpen}
          curElement={curElement}
          handleClick={handleClick}
          handleEdit={handleEdit}
          curText={curText}
          setCurText={setCurText}
          saveEdit={saveEdit}
        />
      </div>
    </>
  );
};

export default CustomPDFViewer;
