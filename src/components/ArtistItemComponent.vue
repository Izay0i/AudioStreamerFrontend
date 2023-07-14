<template>
  <div class="body">
    <div class="select-body" @click="onSelect">
      <img class="avatar" :src="avatar">
      <p class="name">{{ props.artist.artistName }}</p>
    </div>
    <template v-if="props.artist.artistName !== fallbackArtistName">
      <div @click="onEditInfo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { fallbackArtistName, artistContainerName, mimeImgAny } from '../constants/StringConstants.js';
import MediaService from '../services/MediaService.js';
import noSignal from '../assets/no_signal.png';

const props = defineProps({
  artist: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['select-artist', 'edit-click']);

const avatar = computed(() => {
  if (!!props.artist.avatar) {
    return MediaService.GetMediaStream(props.artist.avatar, artistContainerName, mimeImgAny);
  }
  return noSignal;
});

const onSelect = async () => {
  emit('select-artist', { 
    id: props.artist.artistinfoId,
    name: props.artist.artistName,
  });
};

const onEditInfo = () => {
  emit('edit-click', props.artist);
};
</script>

<style scoped>
.body {
  position: relative;
  top: 0;
  cursor: pointer;
  margin: 4px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  min-width: 0;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  background-color: white;
  transition: top 0.35s ease;
  z-index: 0;
}

.body:hover {
  top: -10px;
  color: white;
  background-color: black;
}

.select-body {
  display: flex;
  min-width: 0;
  min-height: 0;
}

.avatar {
  flex: 1;
  min-width: 0;
  min-height: 0;
  object-fit: contain;
  border-radius: 10px;
  background-color: black;
}

.name {
  flex: 2;
  margin-left: 4px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.icons {
  display: flex;
  flex-direction: column-reverse;
}

.icons > *:not(:last-child) {
  margin-top: 10px;
}
</style>