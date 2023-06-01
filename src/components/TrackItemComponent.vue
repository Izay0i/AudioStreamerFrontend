<template>
  <div class="track-body">
    <div style=" flex: 1; display: flex; align-items: center;" @click="onSelectTrack">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      </svg>
      <span>
        {{ manipulated.title }} - {{ manipulated.artistName }}
      </span>
    </div>
    <svg @click="onSelectShowPlaylists" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import StringLengthConstants from '../constants/StringLengthConstants';
import Track from '../objects/Track.js';

const emit = defineEmits(['play', 'show-playlists']);

const onSelectTrack = () => {
  emit('play', track.data);
}

const onSelectShowPlaylists = () => {
  emit('show-playlists', track.data.trackId);
};

const track = defineProps({
  data: {
    type: Track,
    required: true,
  }
});

let manipulated = computed(() => ({
  //prune
  title: track.data.trackName.length > StringLengthConstants.maxVisibleStrLen ? 
  `${ track.data.trackName.slice(0, StringLengthConstants.maxVisibleStrLen) }...` : track.data.trackName,
  artistName: track.data.artistName.length > StringLengthConstants.maxVisibleStrLen ? 
  `${ track.data.artistName.slice(0, StringLengthConstants.maxVisibleStrLen) }...` : track.data.artistName,
}));
</script>

<style scoped>
.track-body {
  margin: 8px 4px 4px 4px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
}

.track-body > span {
  margin-left: 6px;
}

.track-body:hover {
  cursor: pointer;
  color: white;
  border-style: dotted;
  border-width: 2px;
  background-color: black;
}
</style>