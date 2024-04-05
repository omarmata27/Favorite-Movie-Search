// API Key: https://www.omdbapi.com/?i=tt3896198&apikey=41e9af4f
const movieListEl = document.querySelector(".movie__wrapper");

async function searchMovies() {
  const movies = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=41e9af4f`
  );
  const movieData = await movies.json();
  console.log(movieData);
  movieListEl.innerHTML = movieData
    .map(
      (movie) =>
        `<div class="movie__wrapper">
    <figure class="movie__poster">
    </figure>
    <h1 class="movie__title"></h1>
    <p class="movie__runtime">fdsa</p>
    </div>
    `
    )
    .join("");
}

searchMovies();
