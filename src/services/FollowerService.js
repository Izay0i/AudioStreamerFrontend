import { BASE_URL } from "../http-common.js";

const name = 'follower';

export default {
  async GetFollowings(id) {
    const response = await fetch(`${BASE_URL}/${name}/user/${id}`);
    return response.json();
  },
  async GetTracksFromFollowings(id) {
    const response = await fetch(`${BASE_URL}/${name}/tracks/user/${id}`);
    return response.json();
  },
  async FollowUser(id, followId) {
    const response = await fetch(`${BASE_URL}/${name}/user/${id}/follow/${followId}`, {
      method: 'POST',
      mode: 'cors',
    });
    return response.json();
  },
  async UnfollowUser(id, unfollowId) {
    const response = await fetch(`${BASE_URL}/${name}/user/${id}/unfollow/${unfollowId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};