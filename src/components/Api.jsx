import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Typography, FormGroup, Box, InputAdornment, IconButton, LinearProgress  } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Upcoming from "./upcoming/Upcoming";
import LocalStor from "./LocalStor";
import Cards from "./Cards";
import CloseIcon from "@mui/icons-material/Close";
import SplitButton from "./SplitButton";
import { MyContext } from "../MyContext";


const Control = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    margin: 5,
    marginRight: -5,
  },
  "&:hover": {
    border: 'none',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  textTransform: "lowercase",
  backgroundColor: "orange",
  color: 'black',
  margin: 5,
  padding: 5,
  "&:hover": {
    backgroundColor: "orangered", // Changer la couleur de fond au survol
    // color: 'white', // Changer la couleur du texte au survol
  },
}));

const CenteredFormGroup = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
  flexWrap: "nowrap"
}));

export default function Api() {
  const options = ['fr-FR', 'en-US', 'he-IL'];
  const [dataMovie, setDataMovie] = useState([]);
  const [result, setResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [indicator, setIndicator] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [state, setState] = useContext(MyContext);
  const { state, setState, changeLang } = useContext(MyContext);
  const [label, setLabel] = useState(state.lang === 'fr-FR'?'Film, serie ou acteur...':state.lang === 'en-US'?'Movie, series or actor...':'סרט, סדרה או שחקן...')

  useEffect(() => {
    setLabel(state.lang === 'fr-FR'?'Film, serie ou acteur...':state.lang === 'en-US'?'Movie, series or actor...':'...סרט, סדרה או שחקן')
  }, [state.lang])
  const keyApi = process.env.REACT_APP_THEMOVIEDB_API_KEY;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    setIndicator(true)
    // Utilisez une fonction async pour gérer la requête
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${keyApi}&language=${state.lang}&query=${searchTerm}`
        );
        console.log("response api", response.data.results);
        // localStorage.setItem("name", JSON.stringify(response.data.results));
        setDataMovie(response.data.results);
        setResult(searchTerm);
        setSearchTerm("");
        setIndicator(false)
        document.activeElement.blur(); // Ferme le clavier sur mobile
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

const handleClear = () => {
  setSearchTerm("");
};

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    localStorage.setItem('LANGUAGE_STORAGE', options[index]);
    setState((prevState) => ({
      ...prevState,
      lang: options[index],
    }));
  };

  const endAdornment = () => {
    if (searchTerm) {
      return (
        <InputAdornment position="end">
          <IconButton
            onClick={handleClear}
            onMouseDown={handleKeyPress}
            color="warning"
          >
            <CloseIcon />
          </IconButton>
        </InputAdornment>
      );
    }
    return "";
  };



  return (
    <Control>
      <CenteredFormGroup row autoComplete="on">
        <StyledTextField
          // variant="outlined"
          // placeholder="Film, serie ou acteur..."
          color="warning"
          sx={{
            input: {
                color: 'white',
            },
            label: { color: 'orange' },
        }}
          label={label}
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          // endAdornment={endAdornment()}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleClick}
          disableElevation
        >
          {state.lang === 'fr-FR'?'Recherche':state.lang === 'en-US' ?'Search':'חיפוש'}
        </StyledButton>
        <SplitButton 
          fromLang={true} 
          hideArrow={true} 
          optionsProps={options} 
          selectedIndexProps={handleMenuItemClick} 
        />
      </CenteredFormGroup>
      {dataMovie.length > 0 && (
        <Typography
        // gutterBottom
          variant="h6"
          align="left"
          color='orange'
          marginLeft={2}
        >
          Result for: {result}
        </Typography>
      )}
      <Cards datas={dataMovie} />
      {indicator && <LinearProgress color='warning' />}
      <Upcoming />
      <LocalStor datas={Object.values(localStorage)} />
    </Control>
  );
}
