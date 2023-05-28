<template>
  <div class="body">
    <div class="clickable" @click="onTrackClicked">
      <img :src=thumbnail />
      <div class="side-info">
        <span>{{ trackName }} - {{ artistName }}</span>
        <span>{{ dateCreated }}</span>
      </div>
    </div>

    <button>Info</button>
    <button>Add to playlist</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['playTrack']);

const onTrackClicked = () => {
  emit('playTrack', trackData.url);
};

const trackData = defineProps({
  trackId: {
    type: Number,
    required: true,
  },
  memberId: {
    type: Number,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  description: String,
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  dateCreated: {
    type: Date,
    default() {
      return new Date();
    },
  }
});
</script>

<style scoped>
.body {
  cursor: pointer;
  position: relative;
  margin-bottom: 8px;
  padding: 22px;
  max-width: 90%;
  max-height: 32px;
  border-style: double;
  border-width: 6px;
  background-color: lightgray;
  box-shadow: 4px 6px rgba(0, 0, 0, 0.72);
}

.clickable {
  display: flex;
}

.side-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>