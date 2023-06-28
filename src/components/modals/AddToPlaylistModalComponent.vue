<template>
  <ModalComponent :width="25" :height="50" :z-index="999" title="My Playlists" @close-modal="onModalClose">
    <div class="section">
      <div style="display: flex; position: sticky; top: 0;">
        <input 
        type="text" 
        class="search-input" 
        placeholder="Create a new playlist" 
        v-model="searchInput" 
        @keydown.enter="onCreatePlaylistClick">
        <button @click="onCreatePlaylistClick">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
            <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z"/>
            <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </button>
      </div>
      <template v-for="playlist in playlists" :key="playlist.playlistId">
        <PlaylistItemComponent 
        :id="playlist.playlistId" 
        :name="playlist.name" 
        :enabled="playlist.name !== fallbackPlaylistName" 
        @add-to-playlist="onAddToPlaylistClick" />
      </template>
    </div>
  </ModalComponent>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fallbackPlaylistName } from '../../constants/StringConstants.js';
import { minNameLength, maxNameLength } from '../../constants/NumericConstants.js';
import { GetCredentials } from '../../functions/StorageHelper.js';
import ModalComponent from './ModalComponent.vue';
import PlaylistItemComponent from '../PlaylistItemComponent.vue';
import PlaylistService from '../../services/PlaylistService';

onMounted(async () => {
  userId.value = await GetCredentials();
  await GetUserPlaylists();
});

const userId = ref(0);
const playlists = ref([]);
const searchInput = ref('');

const emit = defineEmits(['close-modal-top-level']);

const props = defineProps({
  trackId: {
    type: Number,
    required: true,
    default: 0
  },
});

const GetUserPlaylists = async () => {
  playlists.value = await PlaylistService.GetUserPlaylists(userId.value);
};

const onCreatePlaylistClick = async () => {
  const searchValue = searchInput.value.trim();
  if (!(!!searchValue)) {
    return;
  }

  if (searchValue.length < minNameLength || searchValue.length > maxNameLength) {
    alert(`Name must be within ${ minNameLength } - ${ maxNameLength } characters.`);
    return;
  }

  let response = await PlaylistService.GetPlaylistByNameFromUser(userId.value, searchValue);
  if (response.statusCode === 200) {
    alert(`Playlist with the name ${searchValue} already exists.`);
  }
  else {
    const payload = {
      memberId: userId.value,
      name: searchValue,
    };
    response = await PlaylistService.AddPlaylist(payload);
    if (response.statusCode === 201) {
      searchInput.value = '';
      const playlistId = response.objects[0];
      await onAddToPlaylistClick(playlistId);
      await GetUserPlaylists();
    }
    alert(response.message);
  }
};

const onAddToPlaylistClick = async (value) => {
  const playlistId = value;
  const response = await PlaylistService.AddTrackToPlaylist(playlistId, props.trackId);
  alert(response.message);
};

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}
</style>