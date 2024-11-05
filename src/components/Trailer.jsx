import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { LoadingButton } from "@mui/lab";

export default function Trailer({ title, movieID, type }) {
  const API_KEY = "AIzaSyD5gsAm62PJLgHNIFmErVbJpM-85NiqF4Q";
  const BEARER_AUTHORIZATION =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjRmZmZhZjc4OWMwOTI2YTNhOTZhNTkyOTAyYjUzYiIsIm5iZiI6MTcyNDY5NTkyNy41OTIxNjEsInN1YiI6IjVmZjVlOTRiZjQ4ZTBkMDAzZjczM2I3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KcRuYXOvJHJAd3lemHIE57FDyVVWf2W4qiDiVoQOMYM";
  const [query, setQuery] = useState(`${title} trailer`);
  const [videos, setVideos] = useState([]);
  const [url, setUrl] = useState(``);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  function handleBackButton(event) {
    
    if (document.fullscreenElement) {      
      document.exitFullscreen();
      event.preventDefault(); // Empêche la fermeture de l'application
    }
  }
  
  useEffect(() => {    
    window.addEventListener("popstate", handleBackButton);
  
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            type: "video",
            key: API_KEY,
            relevanceLanguage: "fr",
          },
        }
      );
      console.log("res googleapis youtube", response.data);
      setVideos(response.data.items);
      setUrl(
        `https://www.youtube.com/watch?v=${response.data.items[0]?.id?.videoId}`
      );
      setError(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(true);
      setLoading(false);
      window.open(
        `https://www.youtube.com/results?search_query=${query}+trailer`,
        "_blank"
      );
    }
  };

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${type === 'movie' ? "movie": "tv"}/${movieID}/videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: BEARER_AUTHORIZATION,
    },
  };

  const getVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      console.log("response.data.results", response.data.results);

      const officialTrailer = response.data.results.find(
        (video) =>
          video.name === "Official Trailer" ||
          video.name === "Series Trailer" ||
          video.name === "Trailer" ||
          video.name === "Teaser Trailer" ||
          video.name === "Official Trailer [Subtitled]"
      );
      const key = officialTrailer ? officialTrailer.key : null;

      if (key) {
        setUrl(`https://www.youtube.com/watch?v=${key}`);
        setError(false);
      } else {
        console.warn("Official Trailer not found");
        fetchVideos()
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{}}>
      {/* {(url === "" || error) && (<LoadingButton color="info" onClick={getVideo} loading={loading} loadingIndicator="Loading..." >Voir le trailer</LoadingButton>
      )} */}
      {(url === "" || error) &&<LoadingButton color="info" onClick={fetchVideos} loading={loading} loadingIndicator="Loading..." >Voir le trailer</LoadingButton>}
      {url !== "" && <ReactPlayer url={url} width="250px" height="150px" controls />}
    </div>
  );
}
