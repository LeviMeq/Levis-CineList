import React from "react";
import {
  makeStyles,
  Grid,
  Box
} from "@material-ui/core";
import Try from "./Try";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  media: {
  },
});

export default function Cards(props) {
  const classes = useStyles();
  // const datta = JSON.parse(localStorage.getItem("name"))
  
  return (
    <Box>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {props.datas.map((movie, index) => {
              return <Try movie={movie} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
