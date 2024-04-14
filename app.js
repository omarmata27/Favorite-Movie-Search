const movieListEl = document.getElementById("movieListEl");
const searchInput = document.getElementById("search__movies__bar");
const searchButton = document.querySelector(".search__btn");
const homeLink = document.getElementById("homeLink");

// Search when Enter key is pressed in the search input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies(searchInput.value);
  }
});

// Search when search button is clicked
searchButton.addEventListener("click", function () {
  searchMovies(searchInput.value);
});

homeLink.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default link behavior
  resetSearch();
});

async function searchMovies(searchTerm) {
  try {
    if (!searchTerm) {
      console.warn("Search term is empty");
      return;
    }

    // Clear previous search results
    movieListEl.innerHTML = "";

    const movies = await fetch(
      `https://www.omdbapi.com/?apikey=41e9af4f&s=${searchTerm}`
    );
    if (!movies.ok) throw new Error("Not a valid response");
    const movieData = await movies.json();

    // Check if movies array is empty
    if (movieData.Search && movieData.Search.length === 0) {
      throw new Error("No movies found for the given search term");
    }

    showMovieInfo(movieData.Search);
  } catch (err) {
    console.warn(err.message);
  }
}

function showMovieInfo(movies) {
  if (!Array.isArray(movies)) {
    console.warn("No movies found");
    return;
  }

  movieListEl.innerHTML = movies.map((movie) => movieInfo(movie)).join("");
}

function movieInfo(movie) {
  return `
    <div class="movie__wrapper">
      <div class="movie__poster">
        <img src="${movie.Poster}" alt="${movie.Title}" />
      </div>
      <div class="movie__info">
        <h1 class="movie__title">${movie.Title}</h1>
        <p class="movie__year"><b>Released:</b> ${movie.Year}</p>
      </div>
    </div>
  `;
}

function resetSearch() {
  // Clear search input
  searchInput.value = "";
  // Clear movie posters
  movieListEl.innerHTML = "";
}
