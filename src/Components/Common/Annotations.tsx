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
import BlockIcon from "@mui/icons-material/Block";
import { IconButton, Stack, Tooltip } from "@mui/material";

const Annotations = (props: any) => {
  return (
    <>
      <Popper
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        sx={{ zIndex: 51 }}
        placement={"top"}
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
        <Box sx={{ bgcolor: "#555555", padding: "5px" }}>
          <Stack direction="row">
            <Box
              sx={{
                borderRight: "1px solid white",
                padding: "0px 10px",
                color: "white",
              }}
            >
              {props.flag ? (
                <Tooltip title="Edit Section" arrow>
                  <IconButton
                    color="primary"
                    aria-label="Edit section"
                    size="small"
                  >
                    <EditIcon fontSize="inherit" color="info" />
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
                borderRight: "1px solid white",
                padding: "0px 10px",
                color: "white",
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
                  >
                    <BlockIcon fontSize="inherit" color="info" />
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
                borderRight: "1px solid white",
                padding: "0px 10px",
                color: "white",
              }}
            >
              {props.flag ? (
                <Tooltip title="Add New Section" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                  >
                    <AddIcon fontSize="inherit" color="info" />
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
                borderRight: "1px solid white",
                padding: "0px 10px",
                color: "white",
              }}
              onClick={() => {
                props.curElement.style.paddingLeft = `${
                  parseFloat(props.curElement.style.paddingLeft) - 5
                }px`;
              }}
            >
              {props.flag ? (
                <Tooltip title="Move Left" arrow>
                  <IconButton
                    color="primary"
                    aria-label="add to shopping cart"
                    size="small"
                  >
                    <KeyboardBackspaceIcon fontSize="inherit" color="info" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  left
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                padding: "0px 10px",
                color: "white",
              }}
              onClick={() => {
                props.curElement.style.paddingLeft = `${
                  parseFloat(props.curElement.style.paddingLeft) + 5
                }px`;
              }}
            >
              {props.flag ? (
                <Tooltip title="Move Right" arrow>
                  <IconButton
                    color="primary"
                    aria-label="move right"
                    size="small"
                  >
                    <ArrowRightAltIcon fontSize="inherit" color="info" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className="completeSpace centerChild"
                >
                  right
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
