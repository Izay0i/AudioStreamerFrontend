import { BASE_URL } from '../http-common.js';

const name = 'predict';

export default {
  async GetRecommendedItems(uId, limit) {
    const response = await fetch(`${BASE_URL}/${name}?` + new URLSearchParams({
      uId,
      limit,
    }));
    return response.json();
  },
  async Predict(payload) {
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
};