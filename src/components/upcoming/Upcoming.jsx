import React, { useState, useEffect, useRef, useContext } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import Cards from "../Cards";
import SplitButton from "../SplitButton";
import { MyContext } from "../../MyContext";

export default function Upcoming() {
  const options = ["upcoming", "top_rated", "popular", "now_playing"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [result, setResult] = useState([]);
  const { state, setState } = useContext(MyContext);
  const keyApi = process.env.REACT_APP_THEMOVIEDB_API_KEY;

  useEffect(() => {
    // Utilisez une fonction async pour gérer la requête
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${options[selectedIndex]}?api_key=${keyApi}&language=${state.lang}&page=1&include_adult=false`
        );
        setResult(response.data.results);
        console.log('response', response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [keyApi, selectedIndex, state]); // Ajoutez `keyApi` comme dépendance si nécessaire

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box style={{ padding: 0 }}>
      {result.length > 0 && (
        <Box sx={{ textAlign: "left", marginLeft: 2, }}>
          <SplitButton optionsProps={options} selectedIndexProps={handleMenuItemClick} />
        </Box>
      )}
      <Box style={{ marginTop: 10, padding: 0 }}>
        <Cards datas={result} />
      </Box>
    </Box>
  );
}
