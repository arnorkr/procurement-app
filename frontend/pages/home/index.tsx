import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const Home: NextPage = () => {

  const handleClick = async () => {
    console.log("clicked");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                sx={{ width: "50%", height: "4rem", fontSize: "1.2rem" }}
              >
                Some other Button
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
