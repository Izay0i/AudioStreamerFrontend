import { BASE_URL } from "../http-common";

const name = 'track';

export default {
  async GetTracks() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  async GetTracksWithTheMostViewsOfTheDay(number) {
    const response = await fetch(`${BASE_URL}/${name}/top/${number}`);
    return response.json();
  },
  async GetTracksFromUserId(uId) {
    const response = await fetch(`${BASE_URL}/${name}/user?` + new URLSearchParams({
      uId,
    }));
    return response.json();
  },
  async GetTrackById(id) {
    const response = await fetch(`${BASE_URL}/${name}/id/${id}`);
    return response.json();
  },
  async SearchTrack(keyword) {
    const response = await fetch(`${BASE_URL}/${name}/${keyword}`);
    return response.json();
  },
  async AddTrack(payload) {
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
  async UpdateTrack(payload) {
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
  async IncreaseViewCount(id) {
    const response = await fetch(`${BASE_URL}/${name}/views/increase/track/${id}`, {
      method: 'PATCH',
      mode: 'cors',
    });
    return response.json();
  },
  async ResetViewCountsOfAllTracks() {
    const response = await fetch(`${BASE_URL}/${name}/views/reset`, {
      method: 'PATCH',
      mode: 'cors',
    });
    return response.json();
  },
  async DeleteTrack(id) {
    const response = await fetch(`${BASE_URL}/${name}?` + new URLSearchParams({
      id,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};