import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Common/SideBar";
import CustomPDFViewer from "../../Components/CustomPDFViewer";
import {
  Box,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
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
  const [pageNumber, setPageNumber] = useState(1);
  const [flag, setFlag] = useState(false);
  const [updated, setUpdated] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

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

  useEffect(()=>{
    document.getElementById(`page_${pageNumber}`)?.scrollIntoView();
  },[pageNumber])

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="centerChild"
      >
        <Box
          sx={{
            width: "50%",
            height: "500px",
            overflowY: "scroll",
            bgcolor: "white",
          }}
        >
          <ul>
            {updated.map((change: any) => {
              return (
                <li>
                  <span>{change.data.pdf_row_id}.</span> {change.data.Text}
                  <Chip
                    label={change.type}
                    size="small"
                    color={
                      change.type === "update"
                        ? "primary"
                        : change.type === "delete"
                        ? "error"
                        : "success"
                    }
                  />
                </li>
              );
            })}
          </ul>
        </Box>
      </Modal>

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
          <Header
            sideBar={sideBar}
            setSideBar={setSideBar}
            handleOpen={handleModalOpen}
          />
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
                  <CustomPDFViewer updated={updated} setUpdated={setUpdated} setPageNumber={setPageNumber}/>
                </Grid>
                <Grid item md={6} sx={{ height: "100%", overflowY: "scroll" }}>
                  {/* <CustomPDFViewer flag={false} /> */}
                  <PDFViewer
                    pageNumber={pageNumber}
                  />
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
