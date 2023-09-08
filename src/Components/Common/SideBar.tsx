import React from "react";
import { Grid, IconButton, Link, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GitHubIcon from "@mui/icons-material/GitHub";
import RuleIcon from "@mui/icons-material/Rule";
import { useNavigate } from "react-router";

interface SB_Data {
  sideBar: any;
  setSideBar: any;
}

const Sidebar: React.FC<SB_Data> = (props) => {
  const { sideBar, setSideBar } = props;
  const nav = useNavigate();

  return (
    <>
      <Grid container>
        <Grid item md={12} mb={2} mt={1}>
          <Grid container>
            <Grid
              item
              md={sideBar ? 4 : 12}
              onClick={() => setSideBar(!sideBar)}
              className={sideBar ? "" : "centerChild"}
            >
              <IconButton aria-label="delete" color="info" size="large">
                <MenuOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item md={8} sx={{ display: `${sideBar ? "flex" : "none"}` }}>
              <Typography
                variant="h6"
                gutterBottom
                className="centerLeft completeSpace"
              >
                Livegage
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={12} mb={2} mt={1}>
          <Grid
            container
            onClick={() => nav("/section")}
            className={`${
              window.location.pathname === "/section"
                ? sideBar
                  ? "active-open"
                  : "active-close centerChild"
                : "normal"
            }`}
          >
            <Grid
              item
              md={sideBar ? 4 : 12}
              className={sideBar ? "" : "centerChild"}
            >
              <IconButton aria-label="delete" size="large" color="inherit">
                <HomeOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item md={8} sx={{ display: `${sideBar ? "flex" : "none"}` }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className="centerLeft completeSpace"
                color="inherit"
              >
                Section
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} mb={2} mt={1}>
          <Grid
            container
            onClick={() => nav("/sentence")}
            className={`${
              window.location.pathname === "/sentence"
                ? sideBar
                  ? "active-open"
                  : "active-close"
                : "normal"
            }`}
          >
            <Grid
              item
              md={sideBar ? 4 : 12}
              className={sideBar ? "" : "centerChild"}
            >
              <IconButton aria-label="delete" size="large" color="inherit">
                <FormatListNumberedIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item md={8} sx={{ display: `${sideBar ? "flex" : "none"}` }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="inherit"
                className="centerLeft completeSpace"
              >
                Sentence
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} mb={2} mt={1}>
          <Grid
            container
            onClick={() => nav("/rule")}
            className={`${
              window.location.pathname === "/rule"
                ? sideBar
                  ? "active-open"
                  : "active-close"
                : "normal"
            }`}
          >
            <Grid
              item
              md={sideBar ? 4 : 12}
              className={sideBar ? "" : "centerChild"}
            >
              <IconButton aria-label="delete" size="large" color="inherit">
                <RuleIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item md={8} sx={{ display: `${sideBar ? "flex" : "none"}` }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="inherit"
                className="centerLeft completeSpace"
              >
                Rules
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} mb={2} mt={1}>
          <Grid
            container
            onClick={() => nav("/textversion")}
            className={`${
              window.location.pathname === "/textversion"
                ? sideBar
                  ? "active-open"
                  : "active-close"
                : "normal"
            }`}
          >
            <Grid
              item
              md={sideBar ? 4 : 12}
              className={sideBar ? "" : "centerChild"}
            >
              <IconButton aria-label="delete" size="large" color="inherit">
                <GitHubIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item md={8} sx={{ display: `${sideBar ? "flex" : "none"}` }}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="inherit"
                className="centerLeft completeSpace"
              >
                Text Version
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
