import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Chip } from "@mui/material";

const Details = () => {
  const location = useLocation();
  const {
    Title,
    Actors,
    Awards,
    BoxOffice,
    Plot,
    Poster,
    Rated,
    Ratings,
    Genre,
    Episodes,
    Year,
  } = location.state;

  return (
    <div data-testid="details-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#14181f",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            color: "#ffffff",
            padding: "20px",
            maxWidth: "800px",
            width: "100%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>
              {Title}
            </Typography>
            <Typography>{Year}</Typography>
          </Box>
          {Poster && (
            <img
              src={Poster}
              alt={Title}
              style={{
                maxWidth: "300px",
                marginBottom: "20px",
                borderRadius: "16px",
                marginLeft: "30%",
                marginTop: "16px",
              }}
            />
          )}
          {Genre && (
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Genre:
            </Typography>
          )}
          {Genre && (
            <Box sx={{ display: "flex", gap: 10, mb: 2 }}>
              <Chip
                label={Genre}
                sx={{ color: "white", backgroundColor: "#21272B" }}
              />
            </Box>
          )}
          {Rated && (
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Rated: {Rated}
            </Typography>
          )}
          {Plot && (
            <Typography variant="body1" sx={{ marginBottom: "20px" }}>
              {Plot}
            </Typography>
          )}
          {Actors && (
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Actors: {Actors}
            </Typography>
          )}
          {Awards && (
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Awards: {Awards}
            </Typography>
          )}
          {BoxOffice && Episodes && (
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Box Office: {BoxOffice}
            </Typography>
          )}
          {Ratings && Ratings.length > 0 && (
            <Typography
              variant="h6"
              sx={{ marginBottom: "10px", marginTop: "20px" }}
            >
              Ratings:
            </Typography>
          )}
          {Ratings && Ratings.length > 0 && (
            <ul style={{ paddingInlineStart: "20px", marginBottom: "20px" }}>
              {Ratings.map((rating: any, index: number) => (
                <li key={index}>
                  <Typography>
                    {rating.Source}: {rating.Value}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
          {Episodes && (
            <Box sx={{ marginBottom: "20px" }} data-testid="episodes-container">
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Episodes:
              </Typography>
              <ul style={{ paddingInlineStart: "20px", marginBottom: "20px" }}>
                {Episodes.map((episode: any) => (
                  <li key={episode.imdbID}>
                    <Typography variant="subtitle1">
                      {episode.Title} ({episode.Released})
                    </Typography>
                    <Typography variant="body2">
                      Episode: {episode.Episode}, IMDB Rating:{" "}
                      {episode.imdbRating}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Details;
