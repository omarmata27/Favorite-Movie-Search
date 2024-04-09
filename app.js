// API Key: https://www.omdbapi.com/?i=tt3896198&apikey=41e9af4f
// API Key: http://www.omdbapi.com/?i=tt3896198&apikey=8fc2ef57
const movieListEl = document.querySelector(".movie__wrapper");

async function searchMovies() {
  try {
    const movies = await fetch(
      "http://www.omdbapi.com/?i=tt3896198&apikey=8fc2ef57"
    ); //response
    console.log(movies);
    if (!movies.ok) throw new Error("Not a valid response");
    const movieData = await movies.json(); //object
    console.log(movieData);
  } catch (err) {
    console.warn(err.message);
  }

  movieListEl.innerHTML = movieData
    .map((movie) => {
      return `
      <div class="movie__wrapper">
      <div class="movie__poster">
        <img src="" alt="" id="poster" />
      </div>
      <div class="movie__info">
        <h1 class="movie__title">${movie.title}</h1>
        <p class="movie__year"><b>Released:</b> 2017</p>
        <p class="movie__actors">
          <b>Actors:</b> Chris Pratt, Zoe Saldana, Dave Bautista
        </p>
        <p class="movie__metascore"><b>Metascore:</b> 67</p>
        <p class="movie__rated"><b>Rated:</b> PG-13</p>
        <p class="movie__plot">
          <b>Plot:</b> "The Guardians struggle to keep together as a team
          while dealing with their personal family issues, notably
          Star-Lord's encounter with his father, the ambitious celestial
          being Ego."
        </p>
      </div>
    </div>
`;
    })
    .join("");
}
searchMovies();
