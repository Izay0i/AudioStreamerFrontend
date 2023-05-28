<template>
  <div class="track-body">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
    </svg>
    <span style="">
      {{ track.data.trackName }} - {{ track.data.artistName }}
    </span>
</div>
</template>

<script setup>
import Track from '../objects/Track.js';

const emit = defineEmits(['play']);

const track = defineProps({
  data: {
    type: Track,
    required: true,
  }
});
</script>

<style scoped>
.track-body {
  margin: 8px 4px 4px 4px;
  padding: 4px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-weight: bold;
  font-size: 20px;
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