//#region Global variables
API_Key = "25bcda46";
const URL_BY_TITLE = "http://www.omdbapi.com/?apikey=25bcda46&t=";
const URL_BY_ID = "http://www.omdbapi.com/?apikey=25bcda46&i=";

const display_div = document.getElementById("display");
//#endregion

//#region Get Data Function

const getByTitle = async (title) => {
  //   console.log(title);
  const response = await fetch(URL_BY_TITLE + `${title}`, { method: "POST" });
  const data = await response.json();
  console.log("getByTitle", data);

  return data;
};

const getByGenre = async (genre) => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=25bcda46&s=${genre}`);
  const data = await response.json();
  console.log("getByGenre", data);
  return data;
};



const getByID = async (imdbId) => {
  //   console.log(title);
  const response = await fetch(URL_BY_ID + `${imdbId}`, { method: "POST" });
  const data = await response.json();
  console.log("getByID", data);

  return data;
};

//#endregion

//#region Render Function

const loadPage = async() => {
  console.log("load page");
};

const renderData = (jsonData) => {
  let html = "";
    html = `
    <div class="container">
    <article>    
    <img class="poster" src="${jsonData.Poster}}" width="200" height="300">
    </article>
    <article class="details">
        <div class="title">Title: ${jsonData.Title}</div>
        <div class="imdbID">IMDB ID: ${jsonData.imdbID}</div>
        <div class="year">Year: ${jsonData.Year}</div>
        <div class="rated">Ratings: ${jsonData.Rated}</div>
        <div class="released">Release date: ${jsonData.Released}</div>
        <div class="runtime">Runtime: ${jsonData.Runtime}</div>
        <div class="genre">Genre: ${jsonData.Genre}</div>
        <div class="director">Director: ${jsonData.Director}</div>
        <div class="writer">Writer: ${jsonData.Writer}</div>
        <div class="actors">Actors: ${jsonData.Actors}</div>
        <div class="plot">Plot: ${jsonData.Plot}</div>
        <div class="imdbRating">IMDB Rating: ${jsonData.imdbRating}</div>
    </article>
    </div>
    `;

    if (jsonData.Response === "False") {
      html = `<div class="error">${jsonData.Error}</div>`;
    }
  
    display_div.innerHTML = html;
  
  } 

  const renderDataLoop = (jsonData) => {
    let html = "";
    if (jsonData.Response === "True") {
      jsonData.Search.forEach((item) => {
        html += `
        <div class="container">
          <article class="poster">    
            <img src="${item.Poster}" width="200" height="300">
          </article><br>
          <article class="details">
          <div class="title">Title: ${item.Title}</div>
          <div class="imdbID">IMDB ID: ${item.imdbID}</div>
          <div class="year">Year: ${item.Year}</div>
          <div class="type">Type: ${item.Type}</div>
          </article> 
          <br>
        </div>
        `;
      });
    } else {
      html = `<div class="error">${jsonData.Error}</div>`;
    }
  
    display_div.innerHTML = html;
  };
  

//#endregion

//#region Event Functions
const onSubmit = async (event) => {
  console.log("onSubmit");
  event.preventDefault();
  const search = event.target.search.value;
  const mode = event.target.mode.value;
  let data = [];
  if (mode === "byTitle") {
    data = await getByTitle(search.replaceAll(" ", "+"));
    renderData(data);
  }

  if (mode === "byId") {
    data = await getByID(search.replaceAll(" ", ""));
    renderData(data);
  }

  if (mode === "byGenre") {
    console.log(search);
    console.log(mode);
    data = await getByGenre(search.replaceAll(" ", "" ));
    renderDataLoop(data);
  }
};

const onReset = () => {
  console.log("onReset");
  display_div.innerHTML = "";
};

//#endregion

// --------main function
loadPage();
