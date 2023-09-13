import React, { useEffect, useState } from "react";
import "./App.css";
import CustomPDFViewer from "./Components/CustomPDFViewer";
import Sidebar from "./Components/Common/SideBar";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home/Home";
import Login from "./Routes/Login/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#49637C", // Set your primary color here
      dark: "#9DC2CC",
      light: "#B1DEE0",
    },
    secondary: {
      main: "#212121", // Set your secondary color here
      light: "#00bcd4",
      dark: "#CFCFCF",
    },
    info: {
      main: "#FFFFFF",
    },
    success: {
      main: "#38A169",
    },
    error: {
      main: "#E53E3E",
    },
  },
});

function App() {
  

  return (
    <>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
