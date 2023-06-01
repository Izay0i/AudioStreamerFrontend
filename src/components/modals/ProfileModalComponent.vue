<template>
  <ModalComponent title="Profile" @close-modal="onModalClose">
    <div class="section">
      <div class="avatar-section">
        <img :src="avatar" class="avatar">
        <button @click="onChangeAvatar">Change avatar</button>

        <form class="form" @submit.prevent>
          <label>Name:</label>
          <input type="text" placeholder="Display name" :value="profileProps.name">
          <label>Email:</label>
          <input type="email" placeholder="Email" :value="profileProps.email">
          <label>Current password:</label>
          <input type="password" placeholder="Current password">
          <label>New password:</label>
          <input type="password" placeholder="New password">
          <label>Retype new password:</label>
          <input type="password" placeholder="Retype new password">
          <button @click="onSaveCredentials">Save changes</button>
        </form>

        <button v-show="false" style="margin-top: 4px;">Follow</button>
      </div>
    </div>

    <div class="section" style="overflow-y: auto;">
      <input type="text" class="search-input" placeholder="Search" @keydown.enter="">
      <TrackItemComponent 
      v-for="(track, index) in mockTrackObjects" 
      :key="index" 
      :data="track" 
      @play="(value) => console.log(value)" 
      @show-playlists="onShowPlaylists(track.trackId)" />
    </div>

    <div class="section">
      <div class="info-section">
        <textarea readonly class="info">
          {{ profileProps.info }}
        </textarea>
        <button style="margin-top: 4px;" @click="onSaveInfo">Save changes</button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import Track from '../../objects/Track.js';
import noSignal from '../../assets/no_signal.png';
import ModalComponent from './ModalComponent.vue';
import TrackItemComponent from '../TrackItemComponent.vue';

const mockTrackObject = new Track(
  1, 1, 
  'Penelope', 'Sawano Hiroyuki', 'From the Hathaway\'s Flash movie', 
  'https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_penelope_20230519T170042218.mp3&containerName=media&contentType=audio%2Fmpeg', 
  'https://static.zerochan.net/Mobile.Suit.Gundam%3A.Hathaway%27s.Flash.full.3125502.jpg', 
  [], 
  new Date()
);

const mockTrackObject2 = new Track(
  2, 1, 
  'Penelope', 'Sawano Hiroyuki', 'From the Hathaway\'s Flash movie', 
  'https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_penelope_20230519T170042218.mp3&containerName=media&contentType=audio%2Fmpeg', 
  'https://static.zerochan.net/Mobile.Suit.Gundam%3A.Hathaway%27s.Flash.full.3125502.jpg', 
  [], 
  new Date()
);

const mockTrackObjects = [
  mockTrackObject, 
  mockTrackObject2, 
];

const emit = defineEmits(['close-modal-top-level', 'show-playlists-top-level']);

const profileProps = defineProps({
  avatar: {
    type: String,
    default: noSignal,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    default: 'No signal',
  },
});

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};

const onShowPlaylists = (value) => {
  console.log(value);
  emit('show-playlists-top-level', value);
};

const onChangeAvatar = () => {};
const onSaveCredentials = () => {};
const onSaveInfo = () => {};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.avatar-section {
  margin: 4px;
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  overflow-y: auto;
}

.avatar {
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  background-color: black;
}

.form {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
}

.form > * {
  margin-top: 6px;
  padding: 6px;
}

.search-input {
  position: sticky;
  top: 0;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}

.info-section {
  margin: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info {
  flex: 1;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}
</style>