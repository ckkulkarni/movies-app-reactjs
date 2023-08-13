import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

const Base = () => {
  const apiKey = process.env.REACT_APP_MOVIES_API_KEY;
  const [results, setResults] = useState<any>(null);
  const [selectedTab, setSelected] = useState<string>("movie");
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      search: "",
      season: 0,
      episode: 0,
    },
    onSubmit: async (values) => {
      try {
        if (selectedTab === "movie") {
          const response = await axios.get(
            `https://www.omdbapi.com/?t="${values.search}"&apiKey=${apiKey}`
          );
          setResults(response.data);
        } else if (selectedTab === "tv-show") {
          if (values.season > 0) {
            const response = await axios.get(
              `https://www.omdbapi.com/?t="${values.search}"&Season=${values.season}&apiKey=${apiKey}`
            );
            setResults(response.data);
            if (values.season > 0 && values.episode > 0) {
              const response = await axios.get(
                `https://www.omdbapi.com/?t="${values.search}"&Season=${values.season}&Episode=${values.episode}&apiKey=${apiKey}`
              );

              console.log(response);
              setResults(response.data);
            }
          } else {
            const response = await axios.get(
              `https://www.omdbapi.com/?t="${values.search}"&apiKey=${apiKey}`
            );
            console.log(response);
            setResults(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
  });
  const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
    setSelected(newValue);
  };
  const handleNavigation = () => {
    navigation("/details", { state: results });
  };
  return (
    <div className="inputContainer">
      <Box
        sx={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        {results && (
          <Box>
            <Card
              sx={{
                maxWidth: "400px",
                margin: "0 auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                backgroundColor: "#f3f3f3",
                cursor: "pointer",
              }}
              onClick={handleNavigation}
              data-testid="movie-card"
            >
              <CardMedia
                component="img"
                alt={results.Title}
                sx={{ height: "200px", borderRadius: "16px", p: 2 }}
                image={results.Poster}
              />
              <CardContent>
                <Box>
                  <Box>
                    <Typography gutterBottom variant="h5" component="div">
                      {results.Title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {results.Year}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    Rating: {results.Rated}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        <Box
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            aria-label="health tabs"
            textColor="primary"
            sx={{
              "& .MuiTab-root": {
                textTransform: "capitalize",
                marginRight: 4,
                fontSize: "16px",
              },
            }}
            value={selectedTab}
            onChange={handleTabChange}
          >
            <Tab label="Movie" value="movie" />
            <Tab label="TV Show" value="tv-show" />
          </Tabs>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          {selectedTab === "movie" && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <TextField
                variant="outlined"
                label="Search Movie"
                name="search"
                onChange={formik.handleChange}
                type="text"
                sx={{ marginRight: "10px", width: "75%", ml: "10%" }}
                data-testid="search-movies"
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "25%", ml: "35%", mt: 3 }}
              >
                Submit
              </Button>
            </Box>
          )}
          {selectedTab === "tv-show" && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                mt: 2,
                gap: 2,
              }}
            >
              <TextField
                variant="outlined"
                label="Search TV Show"
                name="search"
                onChange={formik.handleChange}
                type="text"
                sx={{ marginRight: "10px", width: "75%", ml: "10%" }}
              />
              <TextField
                variant="outlined"
                label="Search Season"
                name="season"
                onChange={formik.handleChange}
                type="number"
                sx={{ marginRight: "10px", width: "75%", ml: "10%" }}
              />
              <TextField
                variant="outlined"
                label="Search Episode"
                name="episode"
                onChange={formik.handleChange}
                type="number"
                sx={{ marginRight: "10px", width: "75%", ml: "10%" }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "25%", ml: "35%", mt: 1 }}
              >
                Submit
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </div>
  );
};

export default Base;
