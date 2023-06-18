<template>
  <ModalComponent :width="30" :height="50" title="Current songs" @close-modal="onModalClose">
    <div class="section" style="overflow-y: auto;">
      <TrackItemComponent 
      v-for="(track, _) in currentPlaylistModalProps.tracks" 
      :key="track" 
      :data="track" 
      @play="onTrackClick" />
    </div>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from './ModalComponent.vue';
import TrackItemComponent from '../TrackItemComponent.vue';
import Track from '../../objects/Track';

const emit = defineEmits(['close-modal-top-level', 'play-track']);

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};

const onTrackClick = (value) => {
  emit('play-track', value);
};

const currentPlaylistModalProps = defineProps({
  tracks: {
    type: Track[1],
  },
});
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}
</style>