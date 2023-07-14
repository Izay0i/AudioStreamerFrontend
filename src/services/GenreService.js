import { BASE_URL } from '../http-common.js';

const name = 'genre';

export default {
  async GetGenres() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
};