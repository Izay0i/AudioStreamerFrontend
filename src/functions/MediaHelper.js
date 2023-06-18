export const EncodeMedia = (src, contentType) => {
  return `data:${contentType};base64,` + btoa(src);
};