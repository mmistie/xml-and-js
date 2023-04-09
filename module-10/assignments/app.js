const clientId = `df4747730d4a4cb0ab15b930f2521fca`;
const clientSecret = `eeb1e2ef22914f66af5c5fb8df0fde62`;

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
  const limit = 5;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};

const getTracksByPlaylist = async (token, playlistId) => {
  const limit = 5;
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.items;
};

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);
  const list = document.getElementById(`genres`);
  genres.map(async ({ name, id, icons: [icon], href }) => {
    const playlists = await getPlaylistByGenre(token, id);
    const playlistsList = await Promise.all(
      (playlists ?? []).map(async ({ id, name, external_urls: { spotify }, images: [image] }) => {
        const tracks = await getTracksByPlaylist(token, id);
        const tracksList = tracks
          .map(({ track }) => `
            <li>
              <h4>${track.name}</h4>
              <p>${track.artists.map(artist => artist.name).join(', ')}</p>
            </li>
          `)
          .join('');
        return `
          <li>
            <a href="${spotify}" alt="${name}" target="_blank">
              <img src="${image.url}" width="180" height="180"/>
              <h3>${name}</h3>
            </a>
            <ol>
              ${tracksList}
            </ol>
          </li>
        `;
      })
    ).then(arr => arr.join('')); 
    if (playlists) {
      const html = `
        <article class="genre-card">
          <img class="card-icon" src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
          <div>
            <h2>${name}</h2>
            <ul>
              ${playlistsList}
            </ul>
          </div>
        </article>`;
      list.insertAdjacentHTML("beforeend", html);
    }
  });
};
loadGenres();
