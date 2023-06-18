export default class Member {
  constructor(
    memberId, 
    email, 
    displayName, 
    nametag, 
    biography, 
    avatar, 
    dateCreated) 
  {
    this.memberId = memberId;
    this.email = email;
    this.displayName = displayName;
    this.nametag = nametag;
    this.biography = biography;
    this.avatar = avatar;
    this.dateCreated = dateCreated;
  }
};