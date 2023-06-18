import { BASE_URL } from '../http-common.js';

const name = 'caption';

export default {
  async GetAllCaptions() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  async GetCaptions(id) {
    const response = await fetch(`${BASE_URL}/${name}/${id}`);
    return response.json();
  },
  async GetCaptionsByTrackId(id) {
    const response = await fetch(`${BASE_URL}/${name}/track/${id}`);
    return response.json();   
  },
  async AddCaptions(payload) {
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
  async UpdateCaptions(payload) {
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
  async DeleteCaptions(id) {
    const response = await fetch(`${BASE_URL}/${name}?` + new URLSearchParams({
      id,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};