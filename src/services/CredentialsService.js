import { BASE_URL } from "../http-common.js";

const name = 'credentials';

export default {
  async SignUp(payload) {
    const response = await fetch(`${BASE_URL}/${name}/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async SignIn(payload) {
    const response = await fetch(`${BASE_URL}/${name}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async ChangePassword(payload) {
    const response = await fetch(`${BASE_URL}/${name}/change?` + new URLSearchParams({ 
      newPassword: payload.newPassword,
    }), {
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