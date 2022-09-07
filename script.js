//http://www.omdbapi.com/
// page which you can take your API

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function loadMovies(searchTerm) {
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=433c487f`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}
function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("search-list-item");
    //if there is an image of the movie ? place it and if not : put the image is not find
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "image_not_found.png";
    //  ADD div in list which have a class and i gave it is css style
    //and replace sources with the API
    movieListItem.innerHTML = `
      <div class = "search-item-thumbnail">
          <img src = "${moviePoster}">
      </div>
      <div class = "search-item-info">
          <h3>${movies[i].Title}</h3>
          <p>${movies[i].Year}</p>
      </div>
      `;
    //put this div in searchList
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    //when you click please give me all information about movie which is in displayMovieDetails Function
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=433c487f`
      );
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
          details.Awards
        }</p>
    </div>
    `;
}
//if you click on screen => remove list of search
window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
