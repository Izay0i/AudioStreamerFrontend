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
    hasCaptions, 
    captionsLength, 
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
    this.hasCaptions = hasCaptions;
    this.captionsLength = captionsLength;
    this.dateCreated = dateCreated;
  }
}