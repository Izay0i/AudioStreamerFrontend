import { BASE_URL } from '../http-common.js';

const name = 'playlist';

export default {
  async GetPlaylists() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  //abysmal naming scheme, who wrote this
  //oh wait, it was me
  //woe is me
  //how do you simulate a 's
  async GetUserPlaylists(id) {
    const response = await fetch(`${BASE_URL}/${name}/user/${id}`);
    return response.json();
  },
  async GetUserPlaylistsByName(uId, pName) {
    const response = await fetch(`${BASE_URL}/${name}/user/${uId}/playlists/${pName}`);
    return response.json();
  },
  async GetTracksFromPlaylist(id) {
    const response = await fetch(`${BASE_URL}/${name}/tracks/${id}`);
    return response.json();
  },
  async SearchPlaylists(pName) {
    const response = await fetch(`${BASE_URL}/${name}/${pName}`);
    return response.json();
  },
  async GetPlaylistByIdFromUser(uId, pId) {
    const response = await fetch(`${BASE_URL}/${name}/user/${uId}/playlist/id/${pId}`);
    return response.json();
  },
  async GetPlaylistByNameFromUser(uId, pName) {
    const response = await fetch(`${BASE_URL}/${name}/user/${uId}/playlist/name/${pName}`);
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
  async AddTrackToPlaylist(pId, tId) {
    const response = await fetch(`${BASE_URL}/${name}/${pId}/add/track/${tId}`, {
      method: 'PATCH',
      mode: 'cors',
    });
    return response.json();
  },
  async RemoveTrackFromPlaylist(pId, tId) {
    const response = await fetch(`${BASE_URL}/${name}/${pId}/remove/track/${tId}`, {
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