<template>
  <div 
  class="playlist-body" 
  @click="onPlaylistClick" 
  :style="{ 'background-color': props.enabled ? 'lightgray' : 'darkgray' }">
    <div>
      <template v-if="props.enabled">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cassette" viewBox="0 0 16 16">
          <path d="M4 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 6a1 1 0 0 0 0 2h2a1 1 0 1 0 0-2H7Z"/>
          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13ZM1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-.691l-1.362-2.724A.5.5 0 0 0 12 10H4a.5.5 0 0 0-.447.276L2.19 13H1.5a.5.5 0 0 1-.5-.5v-9ZM11.691 11l1 2H3.309l1-2h7.382Z"/>
        </svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cassette-fill" viewBox="0 0 16 16">
          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h.191l1.862-3.724A.5.5 0 0 1 4 10h8a.5.5 0 0 1 .447.276L14.31 14h.191a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13ZM4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM6 6a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1Z"/>
          <path d="m13.191 14-1.5-3H4.309l-1.5 3h10.382Z"/>
        </svg>
      </template>
    </div>
    <span style="font-size: 22px;">
      {{ props.name }}
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits(['add-to-playlist']);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

const onPlaylistClick = () => {
  if (!props.enabled) {
    return;
  }
  emit('add-to-playlist', props.id);
};
</script>

<style scoped>
.playlist-body {
  margin: 8px 4px 4px 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
}

.playlist-body > span {
  margin-left: 6px;
}

.playlist-body:hover {
  cursor: pointer;
  color: white;
  border-style: dotted;
  border-width: 2px;
  background-color: black !important;
}
</style>