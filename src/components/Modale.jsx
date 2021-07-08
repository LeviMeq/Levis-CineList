import React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Try from "./Try";
import { makeStyles, Grid, Link, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: 10,
  },
  card: {
    // maxWidth: 170,
  },
  media: {
    height: 265,
    maxWidth: 180,
  },
});

export default function Modale(props) {
  const classes = useStyles();
  console.log(props.res);
  return (
    <Box onClick={props.closeFunc} className="overlay">
      {props.res.media_type === "person" ? (
        <Box className="contenu" display='inline-block'>
          <Box>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                  {props.res.known_for.map((hisMov) => {
                    return <Try movie={hisMov} />;
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <button onClick={props.closeFunc} className="btnClose">
            Close
          </button>
        </Box>
      ) : (
        <Box className="contenu">
          <img
            className={classes.media}
            src={
              props.res.poster_path !== null
                ? `http://image.tmdb.org/t/p/w185${props.res.poster_path}`
                : require("../img/notFound.png")
            }
            alt={props.res.title}
          />
          <Box className="contain">
            <Typography variant='h5'>{props.res.title}</Typography>
            <ReactReadMoreReadLess
              chartLimit={250}
              readMoreText={"Read more ▼"}
              readLessText={"Read less ▲"}
              readMoreClassName="read-more-less--more"
              readLessClassName="read-more-less--less"
            >
              {props.res.overview}
            </ReactReadMoreReadLess>
            <p>
              <span style={{ fontWeight: "bold" }}> Vote average: </span>
              {props.res.vote_average}
            </p>
            <p>{props.res.release_date}</p>
            <Link
              href={`https://www.youtube.com/results?search_query=${
                props.res.title || props.res.name
              }+trailer`}
              target="_blank"
            >
              Trailer
            </Link>
          </Box>
          <button onClick={props.closeFunc} className="btnClose">
            Close
          </button>
        </Box>
      )}
    </Box>
  );
}
