import { BASE_URL } from "../http-common";

const name = 'media';

export default {
  async Transcribe(src, lang = 'en-US') {
    const response = await fetch(`${BASE_URL}/${name}/transcribe?` + new URLSearchParams({
      src,
      lang,
    }), {
      method: 'GET',
      mode: 'cors',
    });
    return response.json();
  },
  GetMediaStream(src, containerName, contentType) {
    return `${BASE_URL}/${name}?` + new URLSearchParams({
      src,
      containerName,
      contentType,
    });
  },
  async GetMedia(payload) {
    const response = await fetch(`${BASE_URL}/${name}?` + new URLSearchParams({
      src: payload.src,
      containerName: payload.containerName,
      contentType: payload.contentType,
    }), {
      method: 'GET',
      mode: 'cors',
    });
    return response.blob();
  },
  async UploadMedia(payload) {
    const formData = new FormData();
    formData.append('file', payload.file);

    const response = await fetch(`${BASE_URL}/${name}/upload?` + new URLSearchParams({
      id: payload.memberId,
      containerName: payload.containerName,
    }), {
      method: 'POST',
      mode: 'cors',
      body: formData,
    });
    return response.json();
  },
  async DeleteMedia(payload) {
    const response = await fetch(`${BASE_URL}/${name}/delete?` + new URLSearchParams({
      url: payload.url,
      containerName: payload.containerName,
    }), {
      method: 'DELETE',
      mode: 'cors',
    });
    return response.json();
  },
};