import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const IndexPage = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* TODO: extract a FrontPageButton component*/}
              <Button
                variant="contained"
                color="primary"
                href="/request-submission"
                className="custom-button"
                startIcon={<ArticleIcon/>}
              >
                New Request
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="custom-button"
                href="/overview"
                startIcon={<LightbulbIcon/>}
              >
              Request Overview
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default IndexPage;