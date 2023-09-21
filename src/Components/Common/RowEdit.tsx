import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HtmlTagMapper, { GetTag } from "../../lib/HtmlTagMapper";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CSSMapper from "../../lib/CSSMapper";

function RowEdit(props: any) {
  const { open, handleModalClose, data, row, setRow, updateChanges } = props;
  console.log(row);

  // Function to update the data based on the key and value
  const updateData = (key: any, value: any) => {
    setRow((prevData: any) => ({
      ...prevData,
      [key]: value,
    }));
  };

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
            width: "60%",
            height: "600px",
            bgcolor: "white",
          }}
        >
          <Grid container>
            <Grid item md={12}>
              <Box
                sx={{
                  width: "60%",
                  height: "100px",
                  marginTop: "20px",
                  padding: "20px",
                  marginLeft: "20%",
                  overflowY: "scroll",
                  border: "1px solid black",
                  boxShadow: "inset 0 0 5px #000",
                }}
                className="centerChild"
              >
                <Box>
                  {row ? (
                    <GetTag row={row} CSS={CSSMapper(row)} />
                  ) : (
                    "no row to show"
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Grid container>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{ paddingLeft: 7 }}
                  >
                    Font Attributes
                  </Typography>

                  <Box
                    sx={{ width: "100%", height: "350px", overflowY: "scroll" }}
                  >
                    {row && data ? (
                      <Box
                        className="centerChild"
                        sx={{ width: "100%", height: "50px" }}
                      >
                        <Autocomplete
                          disablePortal
                          key={"TextSize"}
                          size="small"
                          id="combo-box-demo"
                          value={`${row["TextSize"]}`}
                          onChange={(e: any) =>
                            updateData("TextSize", e.target.value)
                          }
                          options={data.TextSize.map(
                            (value: any) => `${value}`
                          )}
                          sx={{ width: 300 }}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="TextSize"
                              value={`${row["TextSize"]}`}
                              onChange={(e) =>
                                updateData("TextSize", e.currentTarget.value)
                              }
                            />
                          )}
                        />
                      </Box>
                    ) : null}
                    {data
                      ? Object.entries(data).map(([key, values],index) => {
                          return (
                            <>
                              {key.includes("Font.") &&
                              Array.isArray(values) ? (
                                <Box
                                  className="centerChild"
                                  sx={{ width: "100%", height: "50px" }}
                                  key={index}
                                >
                                  <Autocomplete
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    options={values.map(
                                      (value: any) => `${value}`
                                    )}
                                    sx={{ width: 300 }}
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        label={`${key.split("Font.")[1]}`}
                                        value={`${row[key]}`}
                                        defaultValue={"null"}
                                        onChange={(e) =>
                                          updateData(key, e.currentTarget.value)
                                        }
                                      />
                                    )}
                                  />
                                </Box>
                              ) : null}
                            </>
                          );
                        })
                      : null}
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    sx={{ paddingLeft: 7 }}
                  >
                    Other Attributes
                  </Typography>

                  <Box
                    sx={{ width: "100%", height: "350px", overflowY: "scroll" }}
                  >
                    {data
                      ? Object.entries(data).map(([key, values],index) => {
                          values = Array.isArray(values)
                            ? values.map((value: any) => `${value}`)
                            : [];
                          return (
                            <>
                              {key.includes("attributes.") &&
                              Array.isArray(values) ? (
                                <Box
                                  className="centerChild"
                                  sx={{ width: "100%", height: "50px" }}
                                  key={index}
                                >
                                  <Autocomplete
                                    disablePortal
                                    key={key}
                                    size="small"
                                    id="combo-box-demo"
                                    options={values}
                                    sx={{ width: 300 }}
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        label={`${key.split("attributes.")[1]}`}
                                        value={row[`${key}`]}
                                        onChange={(e) =>
                                          updateData(key, e.currentTarget.value)
                                        }
                                      />
                                    )}
                                  />
                                </Box>
                              ) : null}
                            </>
                          );
                        })
                      : null}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Box
                sx={{ height: "50px", width: "100%" }}
                className="centerRight"
              >
                <Stack direction="row">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<CloseIcon />}
                    sx={{ marginRight: "10px" }}
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    startIcon={<SaveIcon />}
                    sx={{ marginRight: "30px" }}
                    onClick={() => {
                      updateChanges(row, row.pdf_row_id);
                      handleModalClose();
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default RowEdit;
