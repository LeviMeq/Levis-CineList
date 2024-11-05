import React, { useState, useEffect, useContext, useRef } from "react";
import Try from "./Try";
import { Box, Typography, Grid, Button } from "@mui/material";
import { toast } from "material-react-toastify";
import { MyContext } from "../MyContext";
import SplitButton from "./SplitButton";

export default function LocalStor() {
  const options = ["my Movies", "My Series"];
  // const [state, setState] = useContext(MyContext);
  const { state, setState, getLocalStorageExcludingLang, stringifiedArray } = useContext(MyContext);
  const [dataMovieAdd, setDataMovieAdd] = useState([]);
  // const filteredStorageArray = getLocalStorageExcludingLang();
  // const stringifiedArray = filteredStorageArray.map(item => JSON.stringify(item));
  const [removeToast, setRemoveToast] = useState(state.lang === 'fr-FR'?'a été supprimé!':state.lang === 'en-US'?'has been deleted!':'נמחק!')
  useEffect(() => {
    setRemoveToast(state.lang === 'fr-FR'?'a été supprimé!':state.lang === 'en-US'?'has been deleted!':'נמחק!')
    const storedMovies = stringifiedArray.map((item) => JSON.parse(item));    
    setDataMovieAdd(storedMovies);
  }, [state.data]);

  // Filtrer les films
  const movies = dataMovieAdd.filter(
    (film) => film.media_type === "movie" || film.media_type === undefined
  );

  // Filtrer les séries
  const series = dataMovieAdd.filter((film) => film.media_type === "tv");

  const [selectedIndex, setSelectedIndex] = useState(
    movies.length > 0 ? 0 : series.length > 0 ? 1 : 0
  );

  const removeNotify = (title) =>
    toast.error(`${title} ${removeToast}`, { theme: "colored" });

  const removeBtn = (profil) => {
    return (
      <Button
        size="small"
        color="primary"
        sx={{ fontSize: 10, color: "white" }}
        onClick={() => {
          localStorage.removeItem(profil);

          const updatedData = dataMovieAdd.filter(
            (movie) => movie.title !== profil
          );
          setDataMovieAdd(updatedData);
          setState((prevState) => ({
            ...prevState,
            data: stringifiedArray,
          }));
          removeNotify(profil);
        }}
      >
        {state.lang === 'fr-FR'?'Supprimer':state.lang === 'en-US' ?'Remove':'למחוק'}
      </Button>
    );
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "left", marginLeft: 2 }}>
        <SplitButton
          optionsProps={options}
          selectedIndexProps={handleMenuItemClick}
        />
      </Box>
      {selectedIndex === 0 && (
        <Box>
          <Grid
            container
            spacing={2}
            padding={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {movies.length > 0 ? (
              movies.map((film, index) => (
                <Grid key={film.id || index} item xs={5} sm={3} md={1.5}>
                  <Try movie={film} btn={removeBtn(film.title || film.name)} />
                </Grid>
              ))
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  align="left"
                  color="orangered"
                  // marginLeft={2}
                >
                  Ajoutez un film!
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      )}

      {selectedIndex === 1 && (
        <Box>
          <Grid
            container
            spacing={2}
            padding={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {series.length > 0 ? (
              series.map((film, index) => (
                <Grid key={film.id || index} item xs={5} sm={3} md={1.5}>
                  <Try movie={film} btn={removeBtn(film.title || film.name)} />
                </Grid>
              ))
            ) : (
              <Box>
                <Typography
                  variant="h6"
                  align="left"
                  color="orangered"
                  // marginLeft={2}
                >
                  Ajoutez une serie!
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
