import { useFuse } from '@vueuse/integrations/useFuse';
import CaptionService from '../services/CaptionService.js';

const artistOptions = () => ({
  fuseOptions: {
    keys: ['artistName'],
    isCaseSensitive: false,
    shouldSort: false,
  },
});

const trackOptions = () => ({
  fuseOptions: {
    keys: ['trackName', 'artistName'],
    isCaseSensitive: false,
    shouldSort: false,
  },
});

const playlistOptions = () => ({
  fuseOptions: {
    keys: ['name'],
    isCaseSensitive: false,
    shouldSort: false,
  },
});

const FuzzySearch = (items, keyword, options) => {
  if (typeof items !== 'object') {
    return;
  }

  const { results } = useFuse(keyword, items, options);

  let suggestions = [];
  for (const result of results.value) {
    suggestions.push(result.item);
  }
  return suggestions;
};

export const SearchArtists = (items, keyword) => {
  if (typeof items !== 'object') {
    return;
  }
  return FuzzySearch(items, keyword, artistOptions);
};

export const SearchPlaylists = (items, keyword) => {
  if (typeof items !== 'object') {
    return;
  }
  return FuzzySearch(items, keyword, playlistOptions);
};

export const SearchTracks = async (items, keyword, genreId = 0) => {
  if (typeof items !== 'object') {
    return;
  }
  
  let filteredResults = [];
  filteredResults = filteredResults
    .concat(await SearchByCaptions(items, keyword))
    .concat(SearchByName(items, keyword));
  filteredResults = Array.from(new Set(filteredResults));
  
  if (genreId !== 0) {
    filteredResults = filteredResults.filter(fr => fr.genreId === genreId);
  }
  return filteredResults;
};

const SearchByName = (items, keyword) => {
  if (typeof items !== 'object') {
    return;
  }
  return FuzzySearch(items, keyword, trackOptions);
};

//I hate this
const SearchByCaptions = async (items, keyword) => {
  let filteredResults = [];
  let filteredIds = [];
  let trackIds = [];
  let captionObjects = [];
  
  for (const item of items) {
    trackIds.push(item.trackId);
    if (item.offline) {
      item.captions !== '[]' && captionObjects.push({
        trackId: item.trackId,
        captions: item.captions,
      });
    }
    else {
      if (item.hasCaptions && item.captionsLength !== 0) {
        const response = await CaptionService.GetCaptionsByTrackId(item.trackId);
        captionObjects.push(response.objects[0]);
      }
    }
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