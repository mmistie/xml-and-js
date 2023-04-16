const clientId = `df4747730d4a4cb0ab15b930f2521fca`;
const clientSecret = `eeb1e2ef22914f66af5c5fb8df0fde62`;

let _data = [];

const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistByGenre = async (token, genreId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists ? data.playlists.items : [];
};

const getTracksByPlaylist = async (token, playlistId) => {
  const limit = 10;
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );



  const data = await result.json();
  return data.items ? data.items : [];
};

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);

  for (const genre of genres) {
    const playlists = await getPlaylistByGenre(token, genre.id);
    genre.playlists = playlists;

    for (const playlist of playlists) {
      const tracks = await getTracksByPlaylist(token, playlist.id);
      playlist.tracks = tracks;
    }
  }
  _data = genres;
};
const renderGenres = (filterTerm, selectedValue) => {
  let source = _data;
  
  if (!filterTerm) {
    source = _data;
  }
  if (filterTerm) {
    console.log(filterTerm);
        source = source.filter(({ name }) => {
      console.log(name.toLowerCase().includes(filterTerm));
      return name.toLowerCase().includes(filterTerm);
    });
  }

  const list = document.getElementById(`genres`);
  const html = source.reduce((acc, genre) => {
    const playlistsList = genre.playlists
      .map((playlist) => `
        <li>
          <a href=${playlist.external_urls.spotify} alt="${playlist.name}" target="_blank">
            <img src="${playlist.images[0].url}" width="180" height="180"/>
          </a>
        </li>
      `)
      .join(``);
    const tracksList = (selectedValue === 'yes')||(!selectedValue) ? genre.playlists
      .flatMap((playlist) => playlist.tracks.map(({ track }) => `
        <li id="track-list">
          <h4>${track.name}</h4>
          <p>${track.artists.map(artist => artist.name).join(', ')}</p>
        </li>
      `))
      .join(''): '';

    if (genre.playlists.length > 0) {
      return (
        acc +
        `
        <article class="genre-card">
          <img src="${genre.icons[0].url}" width="${genre.icons[0].width}" height="${genre.icons[0].height}" alt="${genre.name}"/>
          <div>
            <h2>${genre.name}</h2>
            <ol>
              ${playlistsList}
            </ol>
          </div>
        <article class="track-list">
          <div>
            <ul>
              ${tracksList}
            </ul>
          </div>
      </article>
      </article>`
      );
    }

    return acc;
  }, ``);

  list.innerHTML = html;
};

loadGenres().then(renderGenres);


const onSubmit = (event) => {
  event.preventDefault();
  const selectedValue=event.target.selection.value;
  const term = event.target.elements.term.value;
  renderGenres(term, selectedValue);
};