import { BASE_URL } from '../http-common.js';

const name = 'memberstats';

export default {
  async GetStatsForTrack(id) {
    const response = await fetch(`${BASE_URL}/${name}/track/${id}`);
    return response.json();
  },
  async GetStatsFromUserForTrack(uId, tId) {
    const response = await fetch(`${BASE_URL}/${name}/user/${uId}/track/${tId}`);
    return response.json();
  },
  async AddStats(payload) {
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
  async UpdateStats(payload) {
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
  async DeleteStats(uId, tId) {
    const response = await fetch(`${BASE_URL}/${name}` + new URLSearchParams({
      userId: uId,
      trackId: trackId,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
  async DeleteStatsOfUser(uId) {
    const response = await fetch(`${BASE_URL}/${name}/user/${uId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
  async DeleteStatsOfTrack(tId) {
    const response = await fetch(`${BASE_URL}/${name}/track/${tId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};