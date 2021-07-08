import React, { useState } from "react";
import Cards from "./Cards";
import {
  Button,
  TextField,
  Typography,
  Container,
  FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Api() {
  const classes = useStyles();
  const datas =
    localStorage.getItem("name") !== "" && localStorage.getItem("name") != null
      ? JSON.parse(localStorage.getItem("name"))
      : [];

  const [dataMovie, setDataMovie] = useState(datas);
  const [result, setResult] = useState("");
  const keyApi = "364fffaf789c0926a3a96a592902b53b";

  const handleChange = (e) => {
    setResult(e.target.value);
  };

  const handleClick = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${keyApi}&query=${result}`
      )
      .then(function (response) {
        console.log(response.data.results);
        localStorage.setItem("name", JSON.stringify(response.data.results));
        setDataMovie(JSON.parse(localStorage.getItem("name")));
      })
      
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <Container>
      <FormControl className={classes.root} autoComplete="on">
        <Typography variant="h4">Search a movie, actor or tv show</Typography>
        <Button variant="outlined" color="secondary" onClick={handleClick}>
          search
        </Button>
        <TextField
          id="standard-basic"
          style={{ padding: "12px 5px" }}
          label="Search a movie..."
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          />
      </FormControl>
      <Container>
        <Cards datas={dataMovie} />
      </Container>
    </Container>
  );
}
