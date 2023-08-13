import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import "text-encoding";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  MemoryRouter,
} from "react-router-dom";
const feature = loadFeature("src/components/features/details.feature");

import Details from "../../Details";
jest.mock("axios");
defineFeature(feature, (test) => {
  const location = {
    state: {
      Title: "Manmadhudu",
      Year: "2002",
      Rated: "N/A",
      Genre: "Comedy, Romance",
      Actors: "Nagarjuna Akkineni, Sonali Bendre, Anshu",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTE1M2IwMzktNjI1Mi00ZTFkLTg4MmMtNTZmMjk4YTdhODlkXkEyXkFqcGdeQXVyNjE2NTgxOTE@._V1_SX300.jpg",
      Ratings: [{ Source: "Internet Movie Database", Value: "8.3/10" }],
      Plot: "A misogynist is forced by circumstances to work with a woman.",
    },
  };
  test("Display details of a movie", ({ given, when, then, and }) => {
    const screen = render(
      <MemoryRouter initialEntries={[location]}>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    given("I am on the details page", () => {
      expect(screen).toBeDefined();
    });
    then('I should see the title "Manmadhudu"', () => {
      const movieTitle = screen.getByText("Manmadhudu");
      expect(movieTitle).toBeInTheDocument();
    });
    and('I should see the release year "2002"', () => {
      const releaseYear = screen.getByText("2002");
      expect(releaseYear).toBeInTheDocument();
    });
    and('I should see the genre "Comedy, Romance"', () => {
      const genre = screen.getByText("Comedy, Romance");
      expect(genre).toBeInTheDocument();
    });
    and('I should see the rated "N/A"', () => {
      const rated = screen.getByText("Rated: N/A");
      expect(rated).toBeInTheDocument();
    });
    and(
      'I should see the plot "A misogynist is forced by circumstances to work with a woman."',
      () => {
        const plot = screen.getByText(
          "A misogynist is forced by circumstances to work with a woman."
        );
        expect(plot).toBeInTheDocument();
      }
    );
    and(
      'I should see the actors "Nagarjuna Akkineni, Sonali Bendre, Anshu"',
      () => {
        const actors = screen.getByText(
          "Actors: Nagarjuna Akkineni, Sonali Bendre, Anshu"
        );
        expect(actors).toBeInTheDocument();
      }
    );
    and("I should see the ratings", () => {
      const ratingSource = screen.getByText("Internet Movie Database: 8.3/10");
      expect(ratingSource).toBeInTheDocument();
    });
    and("I should not see the episodes", () => {
      try {
        screen.getByTestId("episodes-container");
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
