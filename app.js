// API Key: https://www.omdbapi.com/?i=tt3896198&apikey=8fc2ef57
const movieListEl = document.querySelector(".movie__container");

async function onSearchMovie() {
  const movies = await fetch(
    "https://www.omdbapi.com/?i=tt3896198&apikey=8fc2ef57"
  );
  const movieData = await movies.json();
  console.log(movieData);
  movieListEl.innerHTML = movieData
    .map(
      (movie) => `
  <div class="movie__wrapper">
  <figure class="movie__poster">
  </figure>
  <h1 class="movie__title"></h1>
  <p class="movie__runtime">fdsa</p>
</div>
        `
    )
    .join("");
}

onSearchMovie();
