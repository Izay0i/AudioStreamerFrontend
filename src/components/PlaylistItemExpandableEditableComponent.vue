<template>
  <details @toggle="(e) => isVisible = e.target.open">
    <summary>
      <div style="display: flex;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
          <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
        </svg>

        <input 
        style="margin-left: 8px; padding: 4px; font-size: 18px;" 
        placeholder="Name" 
        :disabled="!isEditable" 
        v-model="props.data.name" 
        @keydown.enter="onEditClick">
      </div>

      <div class="icons">
        <svg @click="onPlayClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
        </svg>

        <template v-if="props.data.name !== fallbackPlaylistName">
          <template v-if="!isEditable">
            <svg @click="isEditable = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </template>
          <template v-else>
            <svg @click="onEditClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
              <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
            </svg>
          </template>

          <svg @dblclick="onDeleteClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="darkred" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </template>
      </div>
    </summary>
    <div class="items" v-for="track in tracks" :key="track">
      <TrackItemComponent 
      :data="track" 
      :is-in-playlist="true" 
      :playlist-name="props.data.name" 
      @play="onTrackClick" 
      @remove-from-playlist="onRemoveClick" />
    </div>
  </details>
</template>

<script setup>
import { ref, watch, inject } from 'vue';
import { fallbackPlaylistName } from '../constants/StringConstants.js';
import { maxNameLength, minNameLength } from '../constants/NumericConstants.js';
import { GetCredentials } from '../functions/StorageHelper.js';
import TrackItemComponent from './TrackItemComponent.vue';
import PlaylistService from '../services/PlaylistService.js';

const { notifyRefreshFeed, onTrackClick } = inject('track');

const tracks = ref([]);
const isVisible = ref(false);
const isEditable = ref(false);

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['play-tracks']);

watch(isVisible, async (value) => {
  if (value) {
    await _getTracksFromPlaylist();
  }
});

const _getTracksFromPlaylist = async () => {
  tracks.value = await PlaylistService.GetTracksFromPlaylist(props.data.playlistId);
};

const onPlayClick = async () => {
  tracks.value = await PlaylistService.GetTracksFromPlaylist(props.data.playlistId);
  if (tracks.value.length === 0) {
    return;
  }
  emit('play-tracks', tracks.value);
};

const onEditClick = async () => {
  if (!(!!props.data.name)) {
    return;
  }

  if (props.data.name.length < minNameLength || props.data.name.length > maxNameLength) {
    alert(`Name must be within ${ minNameLength } - ${ maxNameLength } characters.`);
    return;
  }

  const userId = await GetCredentials();
  let response = await PlaylistService.GetPlaylistByIdFromUser(userId, props.data.playlistId);
  const tracksIds = response.objects[0].tracksIds;
  const payload = {
    playlistId: props.data.playlistId,
    name: props.data.name,
    tracksIds,
  };
  response = await PlaylistService.UpdatePlaylist(payload);
  alert(response.message);
  if (response.statusCode === 200) {
    isEditable.value = false;
  }
};

const onDeleteClick = async () => {
  const response = await PlaylistService.DeletePlaylist(props.data.playlistId);
  response.statusCode === 200 && notifyRefreshFeed();
  alert(response.message); 
};

const onRemoveClick = async (value) => {
  const trackId = value;
  await PlaylistService.RemoveTrackFromPlaylist(props.data.playlistId, trackId);
  await _getTracksFromPlaylist();
}
</script>

<style scoped>
input:hover:disabled {
  color: limegreen;
}

details > summary:hover {
  color: white;
  border-style: dotted;
  border-width: 2px;
  background-color: black;
}

details[open] > summary {
  margin-bottom: 0;
  box-shadow: none;
  background-color: gray;
}

details > summary {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 94%;
  margin: 4px 4px 10px 4px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 4px 6px gray, 8px 12px dimgray;
  transition: margin 150ms ease-out;
}

.icons {
  display: flex;
  justify-content: space-between;
}

.icons > :not(:last-child) {
  margin-right: 8px;
}

.items {
  margin: 0 4px 0 4px;
  padding: 2px;
  background-color: darkgray;
}
</style>