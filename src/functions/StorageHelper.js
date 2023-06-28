import { CREDENTIALS_KEY_NAME, TRACKS_KEY_NAME } from "../constants/StorageConstants";
import localforage from "localforage";

export const SaveCredentials = async (value) => {
  await localforage.setItem(CREDENTIALS_KEY_NAME, value).then((_) => {
    //console.log(val);
  }).catch((err) => {
    console.log(err);
  });
};

export const RemoveCredentials = async () => {
  await localforage.removeItem(CREDENTIALS_KEY_NAME).then((_) => {
    //console.log(val);
  }).catch((err) => {
    console.log(err);
  });
};

export const GetCredentials = async () => {
  try {
    const value = await localforage.getItem(CREDENTIALS_KEY_NAME);
    //console.log(value);
    return value;
  }
  catch (err) {
    console.log(err);
  }
};

export const FindTrack = async (track) => {
  const tracks = await GetTracks();
  const found = tracks.find(t => t.trackId === track.trackId);
  return !!found;
};

export const SaveTrack = async (track) => {
  const tracks = await GetTracks();
  const found = await FindTrack(track);
  if (found) {
    console.log('Not so fast!');
    return;
  }
  tracks.push(track);
  return await SaveTracks(tracks);
};

export const RemoveTrack = async (track) => {
  const tracks = await GetTracks();
  const found = await FindTrack(track);
  if (!found) {
    console.log(`Couldn't find track.`);
    return;
  }
  const index = tracks.findIndex(t => t.trackId === track.trackId);
  index !== -1 && tracks.splice(index, 1);
  await SaveTracks(tracks);
};

export const SaveTracks = async (tracks) => {
  return await localforage.setItem(TRACKS_KEY_NAME, tracks).then((value) => {
    console.log(value);
    return true;
  }).catch((err) => {
    console.log(err);
    return false;
  });
};

export const RemoveTracks = async () => {
  await localforage.removeItem(TRACKS_KEY_NAME).then((_) => {
    //console.log(val);
  }).catch((err) => {
    console.log(err);
  }); 
};

export const GetTracks = async () => {
  try {
    let tracks = await localforage.getItem(TRACKS_KEY_NAME);
    if (!(!!tracks)) {
      tracks = [];
    }
    return tracks;
  }
  catch (err) {
    console.log(err);
  }
};