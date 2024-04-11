// API Key: https://www.omdbapi.com/?i=tt3896198&apikey=41e9af4f

const movieListEl = document.getElementById("movieListEl");
const searchInput = document.getElementById("search__movies__bar");

async function searchMovies(searchTerm) {
  try {
    // Clear previous search results
    movieListEl.innerHTML = "";

    const movies = await fetch(
      `https://www.omdbapi.com/?apikey=41e9af4f&s=${searchTerm}`
    );
    if (!movies.ok) throw new Error("Not a valid response");
    const movieData = await movies.json();
    console.log(movieData);
    
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
        <img src="${movie.Poster}" alt="${movie.Title}" id="poster" />
      </div>
      <div class="movie__info">
        <h1 class="movie__title">${movie.Title}</h1>
        <p class="movie__year"><b>Released:</b> ${movie.Year}</p>
      </div>
    </div>
  `;
}

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchMovies(searchInput.value);
  }
});


