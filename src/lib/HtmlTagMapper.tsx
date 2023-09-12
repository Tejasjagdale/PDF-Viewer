import React from "react";
import { Box, IconButton, TextField, TextareaAutosize } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const getTag = (props: any) => {
  let { row, CSS } = props;
  let tagName = row.Path[0];
  let dept = row?.heading_level_dept;
  let Text = row.Text;

  Text = `${row.index_id} + ${row.pdf_row_id} + ${Text}`;
  const pattern = /^row\d+$/;

  switch (tagName) {
    case "th":
    case "td":
    case "p":
    case "li":
    case "lbody":
    case "title":
    case "paragraphspan":
    case "sub":
      return <div style={CSS}>{Text}</div>;
    case "div":
      return <div style={CSS}>{Text}</div>;
    case "h1":
      return <h1 style={CSS}>{Text}</h1>;
    case "h2":
      return <h2 style={CSS}>{Text}</h2>;
    case "h3":
      return <h2 style={CSS}>{Text}</h2>;
    case "reference":
      return (
        <>
          <a href="#" style={CSS}>
            {Text}
          </a>
          <br />
        </>
      );
    case "lbl":
    case "span":
      return <span style={CSS}>{Text}</span>;
    default:
      if (pattern.test(tagName)) {
        return <p style={CSS}>{Text}</p>;
      }

      return null;
  }
};

export const HtmlTagMapper = (props: any) => {
  let {
    row,
    isChild,
    expanded,
    handleClose,
    handleOpen,
    handleClick,
    curElement,
    curText,
    setCurText,
    handleEdit
  } = props;
  let tag = getTag(props);

  return (
    <div
      style={{
        display: "flex",
        zIndex: 20,
        paddingLeft: `${isChild ? 0 : 28}px`,
        cursor: "pointer",
      }}
      // onContextMenu={(event:any)=>{event.preventDefault(); handleClick(event)}}
      tabIndex={curElement === row.pdf_row_id ? -1 : 0}
      onClick={(event: any) => { setCurText(row.Text); handleClick(event, row.pdf_row_id) }}
    >
      <div className="centerChild" style={{ width: "5%", height: "100%" }}>
        {isChild ? (
          expanded.includes(`section${row.pdf_row_id}`) ? (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleClose(`section${row.pdf_row_id}`)}
            >
              <ChevronRightIcon fontSize="inherit" color="primary" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => handleOpen(`section${row.pdf_row_id}`)}
            >
              <ExpandMoreIcon fontSize="inherit" color="primary" />
            </IconButton>
          )
        ) : null}
      </div>

      <div style={{ width: "100%", height: "100%" }}>
        {curElement === row.pdf_row_id ? (
          <TextareaAutosize
            id="outlined-basic"
            value={curText}
            onChange={handleEdit}
            className="editField"
            style={{ fontSize: `11px` }}
          />
        ) : (
          tag
        )}
      </div>
    </div>
  );
};

export default HtmlTagMapper;
