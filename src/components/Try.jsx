import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Box
} from "@material-ui/core";
import Modale from "./Modale";

const useStyles = makeStyles({
  root: {
    margin: 10,
    width: "140px",
  },
  media: {},
});

export default function Try(props) {
  const classes = useStyles();
  const [displayImage, setDisplayImage] = useState("block");
  const [toggleModale, setToggleModale] = useState(false);

  const closeModale = (e) => {
    if (e.target.className !== "btnClose") return;
    setToggleModale(false);
  };
  const openModale = () => setToggleModale(true);

  const profil = props.movie.name || props.movie.title;
  function add() {
    localStorage.setItem(profil, JSON.stringify(props.movie));
    console.log("pro " + profil);
  }

  return (
    <Box>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            // className={classes.media}
            className="imag"
            style={{ display: displayImage }}
            image={
              props.movie.media_type === "person"
                ? props.movie.profile_path !== null
                  ? `http://image.tmdb.org/t/p/w185${props.movie.profile_path}`
                  : require("../img/notFound.png")
                : props.movie.poster_path === null
                ? require("../img/notFound.png")
                : `http://image.tmdb.org/t/p/w185${props.movie.poster_path}`
            }
            title={props.movie.title}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="h4"
            className="titre"
          >
            {props.movie.media_type === "person" ? `${props.movie.name}` : ``}
          </Typography>
        </CardActionArea>
        <CardActions className="action" style={{ display: displayImage }}>
          {  props.btn}
          <Button size="small" color="primary" onClick={add}>
            Add
          </Button>
          <Button onClick={openModale} size="small" color="primary">
            {props.movie.media_type === "person" ? "Hismovies" : "Learn More"}
          </Button>
        </CardActions>
      </Card>
      {toggleModale ? <Modale closeFunc={closeModale} res={props.movie} /> : ""}
    </Box>
  );
}
