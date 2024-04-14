const movieListEl = document.getElementById("movieListEl");
const searchInput = document.getElementById("search__movies__bar");
const searchButton = document.querySelector(".search__btn");
const homeLink = document.getElementById("homeLink");

// Function to reset the search
function resetSearch() {
  // Clear search input
  searchInput.value = "";
  // Clear movie posters
  movieListEl.innerHTML = "";
}

// Search when Enter key is pressed in the search input
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchMovies(searchInput.value);
  }
});

// Search when search button is clicked
searchButton.addEventListener("click", function () {
  searchMovies();
});

// Event listener for the Home link
homeLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior
  resetSearch();
});

// Function to search for movies
async function searchMovies() {
  const searchTerm = searchInput.value.trim(); // Get the trimmed search term
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

// Function to display movie information
function showMovieInfo(movies) {
  if (!Array.isArray(movies)) {
    console.warn("No movies found");
    return;
  }

  movieListEl.innerHTML = movies.map((movie) => movieInfo(movie)).join("");
  // Add 'show' class to movie title and year elements
  document
    .querySelectorAll(".movie__title, .movie__year")
    .forEach((element) => {
      element.classList.add("show");
    });
}

// Function to generate movie info HTML
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
