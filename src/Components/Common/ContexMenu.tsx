import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const ContextMenu = (handleClose:any,anchorEl:any) => {

  return (
    <>
      {/* <div onContextMenu={handleContextMenu}>
        <Typography variant="h6">Right-click me</Typography>
      </div> */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={()=> handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Button onClick={()=> handleClose()}>Option 1</Button>
        <Button onClick={()=> handleClose()}>Option 2</Button>
        {/* Add more custom options as needed */}
      </Popover>
    </>
  );
};

export default ContextMenu;
