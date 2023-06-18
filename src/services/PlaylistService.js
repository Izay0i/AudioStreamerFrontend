import { BASE_URL } from '../http-common.js';

const name = 'playlist';

export default {
  async GetPlaylists() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  //how do you simulate a 's
  async GetUserPlaylists(id) {
    const response = await fetch(`${BASE_URL}/${name}/user/${id}`);
    return response.json();
  },
  async GetUserPlaylistWithId(id) {
    const response = await fetch(`${BASE_URL}/${name}/user/playlist/${id}`);
    return response.json();
  },
  async GetPlaylistsByName(pName) {
    const response = await fetch(`${BASE_URL}/${name}/${pName}`);
    return response.json();
  },
  async AddPlaylist(payload) {
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
  async UpdatePlaylist(payload) {
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
  //abysmal naming, who wrote this
  //oh wait, it was me
  //woe is me
  async AddTrackToPlaylist(pId, tId) {
    const response = await fetch(`${BASE_URL}/${name}/${name}/${pId}/add/track/${tId}`, {
      method: 'PATCH',
      mode: 'cors',
    });
    return response.json();
  },
  async AddTrackToPlaylist(pId, tId) {
    const response = await fetch(`${BASE_URL}/${name}/${name}/${pId}/remove/track/${tId}`, {
      method: 'PATCH',
      mode: 'cors',
    });
    return response.json();
  },
  async DeletePlaylist(id) {
    const response = await fetch(`${BASE_URL}/${name}?` + new URLSearchParams({
      id,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};