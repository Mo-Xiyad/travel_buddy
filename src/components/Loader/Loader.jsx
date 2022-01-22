import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import useStyles from "../List/styles.js";
export default function Loader() {
  const classes = useStyles();
  const loading = () => {
    return (
      <div className={classes.loading}>
        <CircularProgress size="5rem" />
      </div>
    );
  };
  const openLocations = () => {
    return (
      <Typography variant="h4">
        activate location or search for location...
      </Typography>
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("any");
    }, []);
    return () => clearInterval(interval);
  }, []);

  //   return(

  //   )
}
