import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Common/SideBar";
import CustomPDFViewer from "../../Components/CustomPDFViewer";
import {
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import PDFViewer from "../../Components/PDFViewer";
import { primary_color } from "../../Config";
import data2 from "../../lib/assets/backlog/current/filtered5.json";
import RenderTree from "../../Components/RenderTree";
import Header from "../../Components/Common/Header";

const Home = () => {
  const [sideBar, setSideBar] = useState(false);
  const [flag, setFlag] = useState(false);

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

  useEffect(() => {
    console.log(flag);
  }, [flag]);

  return (
    <>
      <Grid container sx={{ height: "100vh", width: "100vw" }}>
        <Grid
          item
          md={12}
          sx={{
            height: "6vh",
            background: primary_color,
            boxShadow: "0px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Header sideBar={sideBar} setSideBar={setSideBar} />
        </Grid>
        <Grid item md={12}>
          <Grid container sx={{ height: "94vh", width: "100vw" }}>
            <Grid
              item
              md={sideBar ? 2 : 0}
              sx={{
                height: "100%",
                color: "#fff",
                background: primary_color,
                overflowY: "scroll",
                display: `${sideBar ? "block" : "none"}`,
              }}
            >
              {/* <Sidebar sideBar={sideBar} setSideBar={setSideBar} /> */}
              <Divider />
              <RenderTree
                data={data2}
                parentSectionId={-1}
                expanded={expanded}
                handleClose={handleClose}
                handleOpen={handleOpen}
              />
            </Grid>
            <Grid item md={sideBar ? 10 : 12} m={0}>
              <Grid container p={1} sx={{ height: "94vh" }}>
                <Grid item md={6} sx={{ height: "100%", overflowY: "scroll" }}>
                  <CustomPDFViewer />
                </Grid>
                {/* <Grid item md={1}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          defaultChecked
                          checked={flag}
                          onChange={(e) => setFlag(e.target.checked)}
                        />
                      }
                      label="data1"
                    />
                  </FormGroup>
                </Grid> */}
                <Grid item md={6} sx={{ height: "100%", overflowY: "scroll" }}>
                  {/* <CustomPDFViewer flag={false} /> */}
                  <PDFViewer />
                  {/* <div id="adobe-dc-view" style={{width: "800px"}}></div> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
