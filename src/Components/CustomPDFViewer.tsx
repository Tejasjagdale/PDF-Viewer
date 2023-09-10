import React, { useEffect, useRef, useState } from "react";
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
  const [data, setData] = useState<any>(structured_data3);
  const [curElement, setCurElement] = useState<any>(null);
  const [expanded, setExpanded] = useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event?.currentTarget);
    const element = event.currentTarget;
    const ele = document.getElementsByClassName("selected");
    if (ele.length) {
      ele[0].classList.remove("selected");
    }

    element.classList.add("selected");
    setCurElement(element);
  };

  function handleDragDrop(result: any) {
    if (!result.destination) return;
    let { destination, draggableId, source } = result;
    console.log(destination, draggableId, source);
    let newIndex = destination.index
    let oldIndex = source.index
    let newParent = parseInt(destination.droppableId.replace('area', ''));
    let oldParent = parseInt(source.droppableId.replace('area', ''));
    let curId = parseInt(draggableId.replace('section', ''));
    let temp = [...data];

    temp = temp.map((row: any, index: number) => {
      if (row.pdf_row_id === curId) {
        return { ...row, parent_pdf_row_id: newParent, index_id: newIndex };
      }
      return row;
    });
    // temp.sort((a: any, b: any) => a.index_id - b.index_id);

    let oldChildren = getChild(temp, oldParent)
    let newChildren = getChild(temp, newParent)



    temp = temp.map((row2: any) => {

      for (let i = 0; i < oldChildren.length; i++) {
        const row = oldChildren[i];

        if (row2.pdf_row_id === row.pdf_row_id) {
          return { ...row2, index_id: i }
        }
      }

      return row2
    })

    temp = temp.map((row2: any) => {

      for (let i = 0; i < newChildren.length; i++) {
        const row = newChildren[i];

        if (i === newIndex && row2.pdf_row_id === row.pdf_row_id) {
          if (row.pdf_row_id === curId) {
            return { ...row2, index_id: newIndex }
          } else {
            return { ...row2, index_id: i + 1 }
          }
        }

        if (row2.pdf_row_id === row.pdf_row_id) {
          return { ...row2, index_id: i }
        }
      }

      return row2
    })

    // newChildren.map((row: any, index: any) => { return { ...row, index_id: index } })

    console.log(oldChildren, newParent, curId, temp);
    setData(temp)
  }

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
          handleClick={handleClick}
          handleDragDrop={handleDragDrop}
        />
      </div>
    </>
  );
};

export default CustomPDFViewer;
