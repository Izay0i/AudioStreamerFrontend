export default class Track {
  constructor(
    trackId, 
    memberId, 
    trackName, 
    artistName, 
    description, 
    url, 
    thumbnail, 
    tags, 
    dateCreated) 
  {
    this.trackId = trackId;
    this.memberId = memberId;
    this.trackName = trackName;
    this.artistName = artistName;
    this.description = description;
    this.url = url;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.dateCreated = dateCreated;
  }
}