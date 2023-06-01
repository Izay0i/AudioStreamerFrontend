<template>
  <ModalComponent :width="25" :height="50" title="My Playlists" @close-modal="onModalClose">
    <div class="section">
      <input type="text" class="search-input" placeholder="Search or create new" @keydown.enter="">
      <PlaylistItemComponent 
      v-for="(playlist, index) in playlistModalProps.playlists" 
      :key="index" 
      :id="playlist.playlistId" 
      :name="playlist.name" />
      <span>{{ playlistModalProps.trackId }}</span>
    </div>
  </ModalComponent>
</template>

<script setup>
import Playlist from '../../objects/Playlist.js';
import ModalComponent from './ModalComponent.vue';
import PlaylistItemComponent from '../PlaylistItemComponent.vue';

const emit = defineEmits(['close-modal-top-level']);

const playlistModalProps = defineProps({
  playlists: {
    type: Array<Playlist>(64),
  },
  trackId: {
    type: Number,
    required: true,
    default: 0
  }
});

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
  position: sticky;
  top: 0;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}
</style>