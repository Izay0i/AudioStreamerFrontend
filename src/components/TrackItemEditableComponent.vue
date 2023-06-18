<template>
  <div class="track-body">
    <div style=" flex: 1; display: flex; align-items: center;" @click="onSelectTrack">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      </svg>
      <span style="margin-left: 4px;">
        {{ manipulated.title }} - {{ manipulated.artistName }}
      </span>
    </div>
    
    <svg @click="onEditClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { maxVisibleStringLength } from '../constants/NumericConstants.js';

const emit = defineEmits(['play', 'edit-track']);

const onSelectTrack = () => {
  emit('play', track.data);
}

const onEditClick = () => {
  emit('edit-track', track.data);
};

const track = defineProps({
  data: {
    type: Object,
    required: true,
  }
});

const manipulated = computed(() => {
  if (track.data == null) {
    return {
      title: 'Foo',
      artistName: 'Bar',
    };
  }

  return {
    //prune
    title: track.data.trackName.length > maxVisibleStringLength ? 
      `${ track.data.trackName.slice(0, maxVisibleStringLength) }...` : track.data.trackName,
    artistName: track.data.artistName.length > maxVisibleStringLength ? 
      `${ track.data.artistName.slice(0, maxVisibleStringLength) }...` : track.data.artistName,
  };
});
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