import React, { useState, useEffect } from "react";
import UpcomingCard from "../upcomingCard";
import { Box } from "@material-ui/core";

const axios = require("axios").default;

export default function Upcoming() {
  const [result, setResult] = useState([]);
  const keyApi = "364fffaf789c0926a3a96a592902b53b";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${keyApi}&language=en-US&page=1&include_adult=false`
      )
      .then(function (response) {
        setResult(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      <h2>The Upcoming movies</h2>
      <Box style={{marginTop: 10}}>
        <UpcomingCard datas={result} />
      </Box>
    </Box>
  );
}
