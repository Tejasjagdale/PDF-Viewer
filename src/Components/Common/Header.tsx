import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header = (props:any) => {
  let {sideBar, setSideBar} =  props;

  return (
    <Grid container>
      <Grid item md={1} className="centerChild">
        <IconButton color="info" aria-label="add to shopping cart" onClick={()=> setSideBar(!sideBar)}>
          <MenuIcon />
        </IconButton>
      </Grid>
      <Grid item md={3}>
        <Typography className="centerLeft completeSpace" variant="body1" sx={{color:"white"}} gutterBottom>
          test.pdf
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
