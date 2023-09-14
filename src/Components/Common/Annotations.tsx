import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddIcon from "@mui/icons-material/Add";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton, Stack, Tooltip } from "@mui/material";
import Stack2 from "../../hooks/newStack";
import Queue from "../../hooks/newQueue";
import { getChild } from "../../lib/PDFRestructure";
import SettingsIcon from "@mui/icons-material/Settings";
interface QueueElement {
  id: number;
}

const Annotations = (props: any) => {
  let { data, setData, curElement, saveEdit, checkUpdated, handleModalOpen } = props;

  const deleteIndex = (data: any, parentId: any) => {
    let temp = [...data];
    let Children = getChild(temp, parentId);

    temp = temp.map((row2: any) => {
      for (let i = 0; i < Children.length; i++) {
        const row = Children[i];

        if (row2.pdf_row_id === row.pdf_row_id) {
          checkUpdated({ ...row2, index_id: i }, "update");
          return { ...row2, index_id: i };
        }
      }

      return row2;
    });

    setData(temp);
  };

  const deleteRow = (id: any) => {
    let temp = [...data];
    let parentId = -1;
    let level: any = new Queue();
    level.enqueue(id);
    while (level.size()) {
      id = level.peek();
      temp = temp.filter((row: any) => {
        if (row.parent_pdf_row_id === id) {
          level.enqueue(row.pdf_row_id);
          // console.log("hello",row.pdf_row_id)
          checkUpdated(row, "delete");
          return false;
        }

        if (row.pdf_row_id === id) {
          parentId = row.parent_pdf_row_id;
          // console.log("hello",row.pdf_row_id)
          checkUpdated(row, "delete");
        }

        return row.pdf_row_id !== id;
      });
      level.dequeue();
    }

    setTimeout(() => {
      deleteIndex(temp, parentId);
    }, 2000);
    setData(temp);
  };

  const addChild = (id: any) => {
    let temp = [...data];
    let rowData: any = null;
    let oldChildren = getChild(temp, id);
    if (oldChildren.length) {
      rowData = { ...oldChildren[0] };
    } else {
      temp.map((row: any) => {
        if (row.pdf_row_id === id) {
          rowData = { ...row };
        }
        return row;
      });
    }

    temp.sort((a, b) => a.pdf_row_id - b.pdf_row_id);
    let newId: any = temp.at(-1).pdf_row_id + 1;

    rowData["pdf_row_id"] = newId;
    rowData["Text"] = "write your text here...";
    rowData["parent_pdf_row_id"] = id;
    rowData["index_id"] = 0;
    rowData["heading_level_dept"] = oldChildren.length
      ? rowData["heading_level_dept"]
      : rowData["heading_level_dept"] + 1;
    // rowData["pdf_row_id"]
    // rowData["pdf_row_id"]
    // rowData["pdf_row_id"]
    // rowData["pdf_row_id"]
    // rowData["pdf_row_id"]
    // [,Text,TextSize,"Font.alt_family_name": "Deja Vu Sans Condensed",
    // "Font.embedded": true,
    // "Font.encoding": "Identity-H",
    // "Font.family_name": "Deja Vu Sans Condensed",
    // "Font.font_type": "CIDFontType2",
    // "Font.italic": false,
    // "Font.monospaced": false,
    // "Font.name": "MPDFAA+DejaVuSansCondensed-Bold",
    // "Font.subset": true,
    // "Font.weight": 700,,
    // ,]
    temp.push(rowData);

    let newChildren: any = getChild(temp, id);
    newChildren.sort((a: any, b: any) => a.index_id - b.index_id);

    temp = temp.map((row2: any) => {
      for (let i = 0; i < newChildren.length; i++) {
        const row = newChildren[i];
        if (row2.index_id !== 0 && row2.pdf_row_id === row.pdf_row_id) {
          checkUpdated({ ...row2, index_id: i }, "update");
          return { ...row2, index_id: i };
        }

        if (row2.index_id === 0 && row2.pdf_row_id === row.pdf_row_id) {
          if (row.pdf_row_id === newId) {
            checkUpdated({ ...row2, index_id: 0 }, "added");
            return { ...row2, index_id: 0 };
          } else {
            checkUpdated({ ...row2, index_id: 1 }, "update");
            return { ...row2, index_id: 1 };
          }
        }
      }

      return row2;
    });

    temp.sort((a, b) => a.index_id - b.index_id);
    setData(temp);
  };

  const addSibling = (id: any) => {
    let temp = [...data];
    let rowData: any = null;
    temp.map((row: any) => {
      if (row.pdf_row_id === id) {
        rowData = { ...row };
      }
      return row;
    });

    temp.sort((a, b) => a.pdf_row_id - b.pdf_row_id);
    let newId: any = temp.at(-1).pdf_row_id + 1;

    rowData["pdf_row_id"] = newId;
    rowData["Text"] = "write your text here...";

    temp.push(rowData);

    let newChildren: any = getChild(temp, rowData["parent_pdf_row_id"]);
    newChildren.sort((a: any, b: any) => a.index_id - b.index_id);

    temp = temp.map((row2: any) => {
      for (let i = 0; i < newChildren.length; i++) {
        const row = newChildren[i];
        if (row2.pdf_row_id === row.pdf_row_id) {
          if (row.pdf_row_id === rowData.pdf_row_id) {
            checkUpdated({ ...row2, index_id: i }, "added");
          } else {
            checkUpdated({ ...row2, index_id: i }, "updated");
          }
          return { ...row2, index_id: i };
        }
      }

      return row2;
    });

    temp.sort((a, b) => a.index_id - b.index_id);
    setData(temp);
  };

  return (
    <>
      <Popper
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        sx={{ zIndex: 51 }}
        placement={"top-end"}
        modifiers={[
          {
            name: "arrow",
            enabled: true,
            options: {
              element: props.anchorEl,
            },
          },
        ]}
      >
        <Box
          sx={{
            bgcolor: "white",
            boxShadow:
              "0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2)",
            padding: "2px",
          }}
          id="exclude"
        >
          <Stack direction="row">
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
            >
              {props.flag ? (
                <Tooltip title="Edit Section" arrow>
                  <IconButton
                    color="primary"
                    aria-label="Edit section"
                    size="small"
                    sx={{ fontSize: "12px" }}
                    onClick={(event: any) => saveEdit(event, "save")}
                  >
                    <SaveAsIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  edit
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
              onClick={() => {
                props.curElement.remove();
              }}
            >
              {props.flag ? (
                <Tooltip title="Disable Section" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                    sx={{ fontSize: "12px" }}
                  >
                    <BlockIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  disabel
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
              onClick={() => {
                deleteRow(curElement);
              }}
            >
              {props.flag ? (
                <Tooltip title="Delete Section" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                    sx={{ fontSize: "12px" }}
                  >
                    <DeleteIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  delete
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
              onClick={() => {
                addChild(curElement);
              }}
            >
              {props.flag ? (
                <Tooltip title="Add New Child" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                    sx={{ fontSize: "12px" }}
                  >
                    <AddIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  add
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
            >
              {props.flag ? (
                <Tooltip title="Add New Sibling" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                    sx={{ fontSize: "12px" }}
                    onClick={() => {
                      addSibling(curElement);
                    }}
                  >
                    <AddCircleOutlineOutlinedIcon
                      fontSize="inherit"
                      color="primary"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  add
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                // borderRight: "1px solid white",
                // padding: "0px 2px",
                color: "#555555",
              }}
              onClick={handleModalOpen}
            >
              {props.flag ? (
                <Tooltip title="Move Left" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                    sx={{ fontSize: "12px" }}
                  >
                    <SettingsIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  setting
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </Popper>
    </>
  );
};

export default Annotations;
