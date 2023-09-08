import React, { useEffect, useRef, useState } from "react";
import structured_data2 from "../lib/assets/backlog/raw/filtered3.json";
import structured_data3 from "../lib/assets/backlog/current/filtered_dnd3.json";
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

const CustomPDFViewer = (props: any) => {
  const [data, setData] = useState<any>(structured_data2);
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
    const ele = document.getElementsByClassName("selected")
    if (ele.length) {
      ele[0].classList.remove("selected")
    }

    element.classList.add("selected");
    setCurElement(element);
  };

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
          children={data.filter((section: any) => section.parent_pdf_row_id === -1)}
          expanded={expanded}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleClick={handleClick}
        />
      </div>
    </>
  );
};

export default CustomPDFViewer;
