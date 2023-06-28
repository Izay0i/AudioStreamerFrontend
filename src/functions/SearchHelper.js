export const SearchPlaylists = (items, keyword) => {
  if (typeof items !== 'object') {
    return;
  }
  return items.filter(item => 
    item.name
    .toLocaleLowerCase()
    .includes(keyword.toLocaleLowerCase()));
};

export const SearchTracks = async (items, keyword, offline = false) => {
  if (typeof items !== 'object') {
    return;
  }
  
  let filteredResults = [];
  if (!offline) {
    filteredResults = filteredResults
      .concat(await SearchByCaptions(items, keyword));
  }
  filteredResults = filteredResults
    .concat(SearchByName(items, keyword))
    .concat(SearchByArtist(items, keyword))
    .concat(SearchByDescription(items, keyword))
    .concat(SearchByTags(items, keyword));
  filteredResults = Array.from(new Set(filteredResults));
  //console.log(filteredResults);
  return filteredResults;
};

const SearchByName = (items, keyword) => {
  let filteredResults =  items.filter(item => 
    item.trackName
    .toLocaleLowerCase()
    .includes(keyword.toLocaleLowerCase()));
  return filteredResults;
};

const SearchByArtist = (items, keyword) => {
  let filteredResults = items.filter(item => 
    item.artistName
    .toLocaleLowerCase()
    .includes(keyword.toLocaleLowerCase()));
  return filteredResults;
};

const SearchByDescription = (items, keyword) => {
  let filteredResults = items.filter(item => 
    item.description
    .toLocaleLowerCase()
    .includes(keyword.toLocaleLowerCase()));
  return filteredResults;
};

const SearchByTags = (items, keyword) => {
  let filteredResults = [];
  items.forEach(item => {
    let tagsLength = item.tags.length;
    let hits = 0;
    
    item.tags.forEach(tag => {
      tag
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase()) && ++hits;
    });

    //keyword needs to include at least 50% of the tags to be considered accurate
    (hits >= Math.floor(tagsLength / 2.0)) && filteredResults.push(item);
  });
  return filteredResults;
};

//I hate this
import CaptionService from '../services/CaptionService.js';
const SearchByCaptions = async (items, keyword) => {
  let filteredResults = [];
  let filteredIds = [];
  let trackIds = [];
  let captionObjects = [];
  
  for (const item of items) {
    trackIds.push(item.trackId);
    const response = await CaptionService.GetCaptionsByTrackId(item.trackId);
    response.statusCode === 200 && captionObjects.push(response.objects[0]);
  }

  captionObjects.forEach(obj => {
    let trackId = obj.trackId;
    let captions = JSON.parse(obj.captions);
    captions.forEach(caption => {
      caption.message
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase()) && 
      filteredIds.push(trackId);
    });
  });

  filteredIds = filteredIds.filter(value => trackIds.includes(value));
  filteredResults = items.filter(item => filteredIds.includes(item.trackId));
  return filteredResults;
};