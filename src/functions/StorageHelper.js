import { CREDENTIALS_KEY_NAME } from "../constants/StorageConstants";
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
}