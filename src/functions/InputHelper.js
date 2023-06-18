export const ForceAbsoluteInput = (e) => {
  const value = e.target.value;
  return (!!value && value < 0 ? (-1 * value) : value).toFixed(6);
}