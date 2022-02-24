import { Box, Grid } from "@mui/material";

// Summary: Shows some basic information at the bottom
const Bottom = () => {
  return (
    <Box sx={{ flexGrow: 1 }} className="bottom">
      <Grid container>
        <Grid item xs={6}>
          Made by{" "}
          <a
            href="https://github.com/Sebahammer97"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sebahammer97
          </a>
        </Grid>
        <Grid item xs={6}>
          Challenge from Antorchar Digital
        </Grid>
      </Grid>
    </Box>
  );
};

export default Bottom;
