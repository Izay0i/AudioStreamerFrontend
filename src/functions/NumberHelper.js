//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
//Don't quote me on this
export const GetRandomIntInclusive = (from, to) => {
  return Math.floor(Math.random() * (to - from + 1) + from);
};