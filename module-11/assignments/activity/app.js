const clientId = `df4747730d4a4cb0ab15b930f2521fca`;
const clientSecret = `eeb1e2ef22914f66af5c5fb8df0fde62`;

let _data=[];

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
  return data.playlists ? data.playlists.items : [];
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
  return data.items ? data.items : [];
};

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);
  for (const { name, id, icons: [icon], playlists } of genres) {
    const playlists = await getPlaylistByGenre(token, id);
    const tracks = await Promise.all(
      (playlists ?? []).map(async ({ id, name, external_urls: { spotify }, images: [image] }) => {
        const tracks = await getTracksByPlaylist(token, id);
        return { name, external_urls: { spotify }, images: [image], tracks };
      })
    );
    _data.push({ name, icons: [icon], playlists: tracks });
  }
};

const renderGenres = (filterTerm) => {
  let source = _data;
  if (filterTerm) {
    console.log(filterTerm);
        source = source.filter(({ name }) => {
      console.log(name.toLowerCase().includes(filterTerm.toLowerCase()));
      return name.toLowerCase().includes(filterTerm.toLowerCase());
    });
  }

  const list = document.getElementById(`genres`);
  const html = source.reduce((acc, { name, icons: [icon], playlists }) => {
    const tracksList = playlists
      .map(({ tracks }) =>
        tracks
          .map(({ track }) => `
            <li>
              <h4>${track.name}</h4>
              <p>${track.artists.map(artist => artist.name).join(', ')}</p>
            </li>
          `)
          .join('')
      )
      .join('');
  
    if (playlists) {
      const playlistsList = `
        <article class="genre-card">
          <img class="card-icon" src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
          <div>
            <h2>${name}</h2>
            <ul>
              ${tracksList}
            </ul>
          </div>
        </article>`;
      acc += playlistsList;
    }
  
    return acc;
  }, '');
  list.innerHTML = html;
};

loadGenres().then(renderGenres);

const onSubmit = (event) => {
  event.preventDefault();

  const term = event.target.term.value;
  console.log(term);

  renderGenres(term);
};
