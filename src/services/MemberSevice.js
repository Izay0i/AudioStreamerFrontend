import { BASE_URL } from '../http-common.js';

const name = 'member';

export default {
  async GetMembers() {
    const response = await fetch(`${BASE_URL}/${name}`);
    return response.json();
  },
  async GetMember(id) {
    const response = await fetch(`${BASE_URL}/${name}/id/${id}`, {
      method: 'GET',
      mode: 'cors',
    });
    return response.json();
  },
  async SearchMember(keyword) {
    const response = await fetch(`${BASE_URL}/${name}/search/${keyword}`, {
      method: 'GET',
      mode: 'cors',
    });
    return response.json(); 
  },
  async UpdateMember(payload) {
    const response = await fetch(`${BASE_URL}/${name}/update`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  async DeleteMember(email) {
    const response = await fetch(`${BASE_URL}/${name}/delete?` + new URLSearchParams({
      email,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};