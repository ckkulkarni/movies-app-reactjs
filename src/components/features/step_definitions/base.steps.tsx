import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Base from "../../Base";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import "text-encoding";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  MemoryRouter,
} from "react-router-dom";
const feature = loadFeature("src/components/features/base.feature");
import axios from "axios";
import { act } from "react-dom/test-utils";
import Details from "../../Details";
jest.mock("axios");
defineFeature(feature, (test) => {
  test("Search for a movie", ({ given, when, then, and }) => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        Title: "Manmadhudu",
        Year: "2002",
        Rated: "N/A",
        Released: "20 Dec 2002",
        Runtime: "142 min",
        Genre: "Comedy, Romance",
        Director: "Vijay K. Bhaskar",
        Writer: "Vijay K. Bhaskar, Trivikram Srinivas",
        Actors: "Nagarjuna Akkineni, Sonali Bendre, Anshu",
        Plot: "A misogynist is forced by circumstances to work with a woman.",
        Language: "Telugu",
        Poster:
          "https://m.media-amazon.com/images/M/MV5BOTE1M2IwMzktNjI1Mi00ZTFkLTg4MmMtNTZmMjk4YTdhODlkXkEyXkFqcGdeQXVyNjE2NTgxOTE@._V1_SX300.jpg",
        Ratings: [{ Source: "Internet Movie Database", Value: "8.3/10" }],
        imdbRating: "8.3",
        imdbVotes: "4,096",
        imdbID: "tt0355742",
      },
    });

    const screen = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Base />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
    given("I am on the search page", () => {
      expect(screen).toBeDefined();
    });
    when('I select the "Movie" tab', () => {
      const movieTab = screen.getByRole("tab", { name: "Movie" });
      fireEvent.click(movieTab);
    });
    and('I enter "Manmadhudu" in the search input and hit submit', async () => {
      const movieSearch = screen
        .getByTestId("search-movies")
        .querySelector("input")!;
      expect(movieSearch).toBeInTheDocument();

      fireEvent.change(movieSearch, { target: { value: "Manmadhudu" } });
      const submitButton = screen.getByRole("button", { name: "Submit" });
      fireEvent.click(submitButton);
    });

    then("I should see the search results card", async () => {
      await waitFor(() => {
        const movieTitle = screen.getByText("Manmadhudu");
        const movieRating = screen.getByText("Rating: N/A");
        expect(movieTitle).toBeTruthy();
        expect(movieRating).toBeTruthy();
      });
    });
    and("I should be able to click the card to view more details", async () => {
      const movieCard = screen.getByTestId("movie-card");
      act(() => {
        fireEvent.click(movieCard);
      });
      await waitFor(() => {
        expect(screen.getByTestId("details-container")).toBeDefined();
      });
    });
  });
});
