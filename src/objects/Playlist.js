export default class Playlist {
  constructor(
    playlistId,
    memberId,
    name,
    description,
    tracksIds) 
  {
    this.playlistId = playlistId;
    this.memberId = memberId;
    this.name = name;
    this.description = description;
    this.tracksIds = tracksIds;
  }
}