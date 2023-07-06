<template>
  <ModalComponent :width="30" :height="50" :z-index="5" title="In queue" @close-modal="onModalClose">
    <div class="section" style="overflow-y: auto;">
      <div class="controls">
        <div>
          <button @click="setCurrentIndex(shuffle())">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
              <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
            </svg>
          </button>
          <button @click="onLoopPlaylistClick">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" :stroke-width="loop ? 1 : 0" width="24" height="24" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
              <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
            </svg>
          </button>
          <button @click="onClearPlaylistClick">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
        <textarea readonly class="info">{{ currentTrackInfo }}</textarea>
      </div>

      <template v-for="(track, index) in playlistTracks" :key="track" >
        <TrackItemComponent 
        :data="track" 
        :index="index" 
        @play="onTrackClick" 
        @show-playlists="onPlaylistModalClick" 
        @play-in-playlist="setCurrentIndex" />
      </template>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref, inject, onUpdated, watch } from 'vue';
import { GetRandomIntInclusive } from '../../functions/NumberHelper.js';
import Track from '../../objects/Track.js';
import ModalComponent from './ModalComponent.vue';
import TrackItemComponent from '../TrackItemComponent.vue';

onUpdated(() => {
  playlistTracks.value = props.tracks;
  playlistLength.value = props.tracks.length;
});

const currentIndex = inject('track-readonly');
const { onTrackClick, onPlaylistModalClick, setCurrentIndex } = inject('track');

const loop = ref(false);
const playlistTracks = ref([]);
const playlistLength = ref(0);
const currentTrackInfo = ref('');

const props = defineProps({
  tracks: {
    type: Track[1],
  },
});

const emit = defineEmits(['close-modal-top-level', 'loop-playlist', 'clear-playlist']);

watch([playlistTracks, currentIndex], ([tracks, index]) => {
  if (tracks.length === 0) {
    currentTrackInfo.value = 'No signal';
    return;
  }

  const trackName = playlistTracks.value[index].trackName;
  const artistName = playlistTracks.value[index].artistName;
  currentTrackInfo.value = `${trackName} - ${artistName}`;
});

const shuffle = () => {
  return GetRandomIntInclusive(0, playlistLength.value - 1);
};

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};

const onLoopPlaylistClick = () => {
  loop.value = !loop.value;
  emit('loop-playlist', loop.value);
};

const onClearPlaylistClick = () => {
  emit('clear-playlist');
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.controls {
  position: sticky;
  top: 0;
  display: flex;
  border-style: inset;
  border-width: 4px;
  background-color: darkgray;
}

.info {
  flex: 1;
  white-space: pre-line;
  padding: 4px;
  resize: none;
  font-size: 16px;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}
</style>