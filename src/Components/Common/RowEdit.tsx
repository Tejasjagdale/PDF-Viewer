import {
  Autocomplete,
  Box,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HtmlTagMapper, { GetTag } from "../../lib/HtmlTagMapper";
import CSSMapper from "../../lib/CSSMapper";

function RowEdit(props: any) {
  const { open, handleModalClose, data, row, setRow } = props;
  console.log(row);

  // Function to update the data based on the key and value
  const updateData = (key: any, value: any) => {
    console.log(key, value);
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
            height: "550px",
            bgcolor: "white",
          }}
        >
          <Grid container>
            <Grid item md={12}>
              <Box
                sx={{
                  width: "60%",
                  height: "120px",
                  marginTop: "20px",
                  padding: "20px",
                  marginLeft: "20%",
                  overflowY: "scroll",
                  border:"1px solid black",
                  boxShadow: "inset 0 0 5px #000"
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
                    sx={{ width: "100%", height: "330px", overflowY: "scroll" }}
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
                      ? Object.entries(data).map(([key, values]) => {
                          return (
                            <>
                              {key.includes("Font.") &&
                              Array.isArray(values) ? (
                                <Box
                                  className="centerChild"
                                  sx={{ width: "100%", height: "50px" }}
                                >
                                  <Autocomplete
                                    disablePortal
                                    key={key}
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
                                        defaultValue={'null'}
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
                    sx={{ width: "100%", height: "330px", overflowY: "scroll" }}
                  >
                    {data
                      ? Object.entries(data).map(([key, values]) => {
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
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default RowEdit;
