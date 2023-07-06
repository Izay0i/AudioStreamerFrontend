export const ForceAbsoluteInput = (e) => {
  const value = e.target.value;
  return (!!value && value < 0 ? (-1 * value) : value).toFixed(6);
};

//https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
//In an ideal world, the system would send a verification token to an already registered email address
//In an ideal world, one would not need to use this complex regex
//Unfortunately, this is not the ideal world
export const ValidateEmailAddress = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};