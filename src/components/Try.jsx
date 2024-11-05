import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Modale from "./Modale";
import { toast } from "material-react-toastify";
import { MyContext } from "../MyContext";
import { styled } from "@mui/material/styles";
import ReactCardFlip from "react-card-flip";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#f1f1f1",
}));

export default function Try({ movie, btn }) {
  const [toggleModale, setToggleModale] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [titleData, setTitleData] = useState(false);
  const { state, setState, stringifiedArray } = useContext(MyContext);
  const [successToast, setSuccessToast] = useState(state.lang === 'fr-FR'?'a été ajouté!':state.lang === 'en-US'?'has been added!':'התווסף!')
  const [warningToast, setWarningToast] = useState(state.lang === 'fr-FR'?'est déjà dans les favoris!':state.lang === 'en-US'?'is already in favorites!':'כבר במועדפים!')
  
  useEffect(() => {
    setSuccessToast(state.lang === 'fr-FR'?'a été ajouté!':state.lang === 'en-US'?'has been added!':'התווסף!')
    setWarningToast(state.lang === 'fr-FR'?'est déjà dans les favoris!':state.lang === 'en-US'?'is already in favorites!':'כבר במועדפים!')
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const profil = movie.title || movie.name;

  const notify = () =>
    toast.success(`${profil} ${successToast}`, { theme: "colored" });
  const alreadyExist = () =>
    toast.warning(`${profil} ${warningToast}`, { theme: "colored" });

  const closeModale = () => {
    setToggleModale(false);
    setTitleData(false);
  };

  const openModale = () => {
    !titleData ? setTitleData(true) : setToggleModale(true);
  };


  const movieExists = (movieId) => {    
    return stringifiedArray.some((item) => {            
      const movieItem = JSON.parse(item);      
      return movieItem.id === movieId;
    });
  };

  const add = () => {
    if (movieExists(movie.id)) {
      alreadyExist();
    } else {
      localStorage.setItem(profil, JSON.stringify(movie));
      notify();
      
      // Mise à jour du contexte
      setState((prevState) => ({
        ...prevState,
        data: Object.values(localStorage),
      }));
    }
  };

  const getImageUrl = (path) => {
    return path
      ? `https://image.tmdb.org/t/p/w185${path}`
      : require("../img/notFound.png");
  };

  const showTitle = () => {
    setTitleData(!titleData);
  };

  const actionButton = () => {
    return (
      <CardActions
        sx={{
          padding: 0,
          justifyContent: "space-around",
          background: "dimgrey",
        }}
      >
        {btn}
        {!btn && movie.media_type !== "person" && (
          <Button
            sx={{ fontSize: 10, color: "white", height: 40 }}
            size="small"
            // color="primary"
            onClick={add}
          >
            {movie.media_type === "tv" ? state.lang === 'fr-FR'?'Ajouter une série':state.lang === 'en-US' ?'Add serie':'הוסף סדרה' : state.lang === 'fr-FR'?'Ajouter un film':state.lang === 'en-US' ?'Add movie':'הוסף סרט'}
          </Button>
        )}
        <Button
          sx={{ fontSize: 10, margin: 0, color: "white", height: 40 }}
          onClick={openModale}
          size="small"
          color="primary"
        >
          {titleData ? state.lang === 'fr-FR'?'En savoir +':state.lang === 'en-US' ?'Learn More':'למידע נוסף' : state.lang === 'fr-FR'?'+ de détails':state.lang === 'en-US' ?'show details':'הצג פרטים'}
        </Button>
      </CardActions>
    );
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345, cursor: "pointer", background: 'grey' }}>
        <ReactCardFlip isFlipped={titleData}>
          <>
            <CardMedia
              sx={{ height: 200, }}
              image={getImageUrl(movie.poster_path || movie.profile_path)}
              onError={(e) => (e.target.src = require("../img/notFound.png"))}
              title={movie.title || movie.name}
              alt={movie.title || movie.name}
              onClick={showTitle}
            />
            {actionButton()}
          </>
          <>
            <CardContent
              sx={{
                height: 200,
                bgcolor: "dimgrey",
                textTransform: "uppercase",
              }}
              onClick={showTitle}
            >
              <StyledTypography
                gutterBottom
                variant="h7"
                component="div"
                style={{ color: "orange" }}
              >
                {movie.title || movie.name}
              </StyledTypography>
              <StyledTypography variant="h6">
                {movie.release_date}
              </StyledTypography>
              <StyledTypography variant="h7">
                {movie.vote_average}
              </StyledTypography>
            </CardContent>
            {actionButton()}
          </>
        </ReactCardFlip>
      </Card>
      {toggleModale && <Modale closeFunc={closeModale} res={movie} />}
    </Box>
  );
}
