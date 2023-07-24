<template>
  <ModalComponent :width="35" :height="70" :z-index="6" title="Biography" @close-modal="onModalClose">
    <div class="section">
      <div class="upper-body">
        <div class="bio">
          <img class="avatar" :src="avatar">
          
          <div style="display: flex; flex-direction: column;">
            <p class="name">{{ props.artist.artistName }}</p>
            
            <template v-if="props.artist.mainSiteAddress.length !== 0">
              <div style="display: flex; align-items: center;">
                <div style="margin-left: 4px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                  </svg>
                </div>

                <a 
                class="external-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                :href="props.artist.mainSiteAddress" 
                :title="props.artist.mainSiteAddress">
                  {{ props.artist.mainSiteAddress }}
                </a>
              </div>
            </template>
          </div>
        </div>
        <template v-if="props.artist.description.length !== 0">
          <div class="details">
            <textarea readonly class="info">{{ props.artist.description }}</textarea>
          </div>
        </template>
      </div>
      <div class="tracks">
        <div style="display: flex; position: sticky; top: 0; z-index: 1;">
          <input 
          type="text" 
          class="search-input" 
          placeholder="Search tracks" 
          v-model="searchInput" 
          @keydown.enter="onSearchTracks">

          <select style="border-radius: 0;" name="genres" v-model="selectedGenreId" @change="onSelectGenre">
            <option value="0">All</option>
            <template v-for="genre in genresList" :key="genre">
              <option :value="genre.genreId">{{ genre.genreName }}</option>
            </template>
          </select>

          <button style="border-top-left-radius: 0; border-bottom-left-radius: 0;" @click="onSearchTracks">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>

        <template v-if="!isSearching">
          <template v-for="track in tracks" :key="track">
            <TrackItemComponent 
            :data="track" 
            @play="onTrackClick" 
            @show-playlists="onPlaylistModalClick(track.trackId)" />
          </template>
        </template>
        <template v-else>
        <span class="empty-list-label">Please wait...</span>
      </template>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue';
import { artistContainerName, mimeImgAny } from '../../constants/StringConstants.js';
import { SearchTracks } from '../../functions/SearchHelper.js';

import ArtistService from '../../services/ArtistService.js';
import GenreService from '../../services/GenreService.js';
import MediaService from '../../services/MediaService.js';

import noSignal from '../../assets/no_signal.png';
import ModalComponent from './ModalComponent.vue';
import TrackItemComponent from '../TrackItemComponent.vue';

onMounted(async () => {
  genresList.value = await GenreService.GetGenres();

  await getTracks();
});

const { loadingWrapper } = inject('track');
const { onTrackClick, onPlaylistModalClick } = inject('track');

const tracks = ref([]);
const copyOfTracks = ref([]);
const genresList = ref([]);
const isSearching = ref(false);
//0 - All
const selectedGenreId = ref(0);
const searchInput = ref('');

const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close-modal-top-level']);

watch(() => props.artist, async () => {
  await getTracks();
});

const avatar = computed(() => {
  if (!!props.artist.avatar) {
    return MediaService.GetMediaStream(props.artist.avatar, artistContainerName, mimeImgAny);
  }
  return noSignal;
});

const getTracks = async () => {
  const response = await loadingWrapper(ArtistService.GetTracks(props.artist.artistinfoId), isSearching);
  tracks.value = response;
  copyOfTracks.value = response;
};

const getTracksOfGenre = (genreId) => {
  if (genreId !== 0) {
    return copyOfTracks.value.filter(track => track.genreId === genreId);
  }
  else {
    return copyOfTracks.value;
  }
};

const onSelectGenre = () => {
  tracks.value = getTracksOfGenre(parseInt(selectedGenreId.value));
};

const onSearchTracks = async () => {
  if (!!searchInput.value) {
    tracks.value = await loadingWrapper(SearchTracks(
      copyOfTracks.value, 
      searchInput.value.trim(), 
      parseInt(selectedGenreId.value)), 
      isSearching);
    tracks.value = tracks.value.length !== 0 ? 
      tracks.value : getTracksOfGenre(parseInt(selectedGenreId.value));
  }
  else {
    tracks.value = getTracksOfGenre(parseInt(selectedGenreId.value));
  }
};

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.upper-body {
  flex: 1;
  display: flex;
  min-width: 0;
  min-height: 0;
}

@media (max-width: 912px) {
  .upper-body {
    flex-direction: column;
  }
}

.bio {
  flex: 1;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.avatar {
  margin: 4px;
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  background-color: black;
}

.name {
  margin: 4px;
  white-space: nowrap;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  overflow: hidden;
}

.name:hover {
  overflow: auto;
}

.external-link {
  margin: 4px;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.details {
  flex: 1;
  display: flex;
}

.info {
  flex: 1;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  font-size: 18px;
  color: greenyellow;
  border-style: double;
  border-width: 6px;
  background-color: black;
}

.tracks {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: white;
}

.empty-list-label {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>