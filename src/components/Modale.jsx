import React, { useContext, useEffect, useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import Try from "./Try";
import { Box, Grid, Typography, IconButton, styled, Button, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Trailer from "./Trailer";
import { toast } from "material-react-toastify";
import { MyContext } from "../MyContext";

// Créer des composants stylisés avec `styled`
const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}));

const Contenu = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom, #585858, #383838)",
  color: "#f1f1f1",
  padding: theme.spacing(2),
  borderRadius: 10,
  position: "relative",
  maxWidth: "75vw",
  maxHeight: "87vh",
  overflowY: "auto",
}));

const Media = styled("img")(({ theme }) => ({
  height: 265,
  maxWidth: 180,
}));

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  flexDirection: "column",
  padding: theme.spacing(1),
}));

export default function Modale(props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // const [state, setState] = useContext(MyContext);
  const { state, setState, changeLang, stringifiedArray } = useContext(MyContext);
  const profil = props.res.title || props.res.name;
  const [successToast, setSuccessToast] = useState(state.lang === 'fr-FR'?'a été ajouté!':state.lang === 'en-US'?'has been added!':'התווסף!')
  const [warningToast, setWarningToast] = useState(state.lang === 'fr-FR'?'est déjà dans les favoris!':state.lang === 'en-US'?'is already in favorites!':'כבר במועדפים!')

  useEffect(() => {
    setSuccessToast(state.lang === 'fr-FR'?'a été ajouté!':state.lang === 'en-US'?'has been added!':'התווסף!')
    setWarningToast(state.lang === 'fr-FR'?'est déjà dans les favoris!':state.lang === 'en-US'?'is already in favorites!':'כבר במועדפים!')
  }, [])
 const notify = () =>
  toast.success(`${profil} ${successToast}`, { theme: "colored" });
const alreadyExist = () =>
  toast.warning(`${profil} ${warningToast}`, { theme: "colored" });


  const movieExists = (movieId) => {    
    return stringifiedArray.some((item) => {      
      const movieItem = JSON.parse(item);      
      return movieItem.id === movieId;
    });
  };

  const add = () => {
    if (movieExists(props.res.id)) {
      alreadyExist();
    } else {
      localStorage.setItem(profil, JSON.stringify(props.res));
      notify();
      props.closeFunc();
      
      // Mise à jour du contexte
      setState((prevState) => ({
        ...prevState,
        data: Object.values(localStorage),
      }));
    }
  };

  return (
    <Overlay onClick={props.closeFunc} className="overlay">
      <Contenu
        onClick={(e) => e.stopPropagation()}
        className={isMobile ? "" : "contenu"}
      >
        {" "}
        {/* Prevent click event propagation */}
        <IconButton
          onClick={props.closeFunc}
          className="btnClose"
          style={{ position: "absolute", top: 5, right: 5 }}
        >
          <CloseIcon />
        </IconButton>
        {props.res.media_type === "person" ? (
          <>
            <ScrollContainer>
              <Typography variant="h5">Ses meilleurs films: </Typography>
              <Grid container spacing={2} justifyContent={"center"}>
                {props.res.known_for.map((hisMov, index) => (
                  <Grid item key={hisMov.id} xs={0}>
                    <Try movie={hisMov} />
                  </Grid>
                ))}
              </Grid>
            </ScrollContainer>
            {/* <button onClick={props.closeFunc} className="btnClose"> */}
          </>
        ) : (
          <>
            {
              <Media
                sx={{
                  width: isMobile ? 70 : 200,
                  height: isMobile ? 120 : 300,
                }}
                src={
                  props.res.poster_path
                    ? `https://image.tmdb.org/t/p/w185${props.res.poster_path}`
                    : require("../img/notFound.png")
                }
                alt={props.res.title}
              />
            }
            <Contenu>
              <Typography variant="h5">{props.res.title}</Typography>
              <ReactReadMoreReadLess
                style={{ color: "red" }}
                charLimit={100}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
                readMoreClassName="read-more-less--more"
                readLessClassName="read-more-less--less"
              >
                {props.res.overview}
              </ReactReadMoreReadLess>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Vote average:</span>{" "}
                {props.res.vote_average}
              </Typography>
              <Typography>{props.res.release_date}</Typography>
              <Trailer title={props.res.title || props.res.name} movieID={props.res.id} type={props.res.media_type} />
              {!movieExists(props.res.id) && (
                <Button
                  sx={{ fontSize: 10, height: 40 }}
                  size="small"
                  color="warning"
                  onClick={add}
                >
                  Add movie
                </Button>
              )}
            </Contenu>
          </>
        )}
      </Contenu>
    </Overlay>
  );
}
