import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ loading, loadingText = "", children }) => {
  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom component="div">
          {loadingText}
        </Typography>
      </Backdrop>
      {children}
    </>
  );
};

export default Loader;
