import { BASE_URL } from '../http-common.js';

const name = 'artistinfo';

export default {
  async GetArtists() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  async GetTracks(artistId) {
    const response = await fetch(`${BASE_URL}/${name}/tracks?` + new URLSearchParams({
      id: artistId,
    }));
    return response.json();
  },
  async GetArtistById(id) {
    const response = await fetch(`${BASE_URL}/${name}/id/${id}`);
    return response.json();
  },
  async GetArtistByName(artistName) {
    const response = await fetch(`${BASE_URL}/${name}/name/${artistName}`);
    return response.json();
  },
  async GetArtistName(id) {
    const response = await fetch(`${BASE_URL}/${name}/name?` + new URLSearchParams({
      id,
    }));
    return response.json();
  },
  async AddArtist(payload) {
    const response = await fetch(`${BASE_URL}/${name}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async UpdateArtist(payload) {
    const response = await fetch(`${BASE_URL}/${name}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
};