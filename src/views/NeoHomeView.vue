<template>
  <div class="body">
    <div style="display: flex; width: 100%;">
      <span class="grey-block">-</span>
      <span class="header">C:\files\projects\audio_streamer\main\{{ defaultDir }}</span>
    </div>

    <div class="side-profile">
      <span @click="onProfileModalClick">Profile</span>
      <span>Exit</span>
    </div>

    <div class="contents">
      <div class="section">
        <ul class="folders">
          <span class="folder" v-for="(item, _) in listItems" @click="onFolderClick(item)">
            <svg v-if="item.icon === 'folder'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
            </svg>
            <svg v-if="item.icon === 'file'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
            </svg>
            <li> {{ item.title }} </li>
          </span>
        </ul>

        <div>
          <button class="add-track" @click="onAddTrackClick">Upload track</button>
        </div>

        <img :src="logo" class="logo" />
      </div>
      
      <div class="section" style="overflow-y: auto;">
        <input type="text" class="search-input" placeholder="Search">
        <TrackItemComponent v-for="(track, index) in mockTrackObjects" :key="index" :data="track" @play="(value) => console.log(value)" />
      </div>

      <div class="section">
        <div style="flex: 3;" class="info-section">
          <TrackInfoComponent @show-playlists="(value) => console.log(value)" @rate="(value) => console.log(value)" />
        </div>

        <div style="flex: 1;" class="audio-section">
          <textarea readonly class="info" style="margin-left: 0; flex: 1; text-align-last: center;">
            ...
          </textarea>
          
          <div class="audio">
            <audio controls controlslist="nodownload" style="flex: 1;">
              <source :src=mockTrackObject.url type="audio/mpeg">
            </audio>

            <div style="flex: ; display: flex; align-items: center;">
              <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </div>
              <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProfileModalComponent v-show="showProfileModal" @close-modal-top-level="onCloseProfileModalClick" />
    <ExitModalComponent v-show="showExitModal" />
    <AddToPlaylistModalComponent v-show="showPlaylistsModal" />
    <CurrentPlaylistModalComponent v-show="showCurrentPlaylistModal" />
    <UploadTrackModalComponent v-show="showUploadTrackModal" />
    <WelcomeModalComponent v-show="showWelcomeModal" />
    <AboutModalComponent v-show="showAboutModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Track from '../objects/Track.js';
import logo from '../assets/wordart.png';

import TrackItemComponent from '../components/TrackItemComponent.vue';
import TrackInfoComponent from '../components/TrackInfoComponent.vue';

import ProfileModalComponent from '../components/modals/ProfileModalComponent.vue';
import ExitModalComponent from '../components/modals/ExitModalComponent.vue';
import AddToPlaylistModalComponent from '../components/modals/AddToPlaylistModalComponent.vue';
import CurrentPlaylistModalComponent from '../components/modals/CurrentPlaylistModalComponent.vue';
import UploadTrackModalComponent from '../components/modals/UploadTrackModalComponent.vue';
import WelcomeModalComponent from '../components/modals/WelcomeModalComponent.vue';
import AboutModalComponent from '../components/modals/AboutModalComponent.vue';

const defaultDir = ref('*.*');

// Fun
const showProfileModal = ref(false);
const showExitModal = ref(false);
const showPlaylistsModal = ref(false);
const showCurrentPlaylistModal = ref(false);
const showUploadTrackModal = ref(false);
const showWelcomeModal = ref(false);
const showAboutModal = ref(false);

const mockTrackObject = new Track(
  1, 1, 
  'Penelope', 'Sawano Hiroyuki', 'From the Hathaway\'s Flash movie', 
  'https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_penelope_20230519T170042218.mp3&containerName=media&contentType=audio%2Fmpeg', 
  'https://static.zerochan.net/Mobile.Suit.Gundam%3A.Hathaway%27s.Flash.full.3125502.jpg', 
  [], 
  new Date()
);

const mockTrackObjects = [
  mockTrackObject, 
  mockTrackObject, 
];

const listItems = [
  { title: 'Home', icon: 'folder', }, 
  { title: 'Discover', icon: 'folder', }, 
  { title: 'Timeline', icon: 'folder', }, 
  { title: 'Storage', icon: 'folder', }, 
  { title: 'welcome.txt', icon: 'file', }, 
  { title: 'about.txt', icon: 'file', }, 
];

const onFolderClick = (item) => {
  defaultDir.value = item.icon === 'folder' ? item.title.toLowerCase() : '*.*';
};

const onProfileModalClick = () => {
  showProfileModal.value = true;
};

const onCloseProfileModalClick = (value) => {
  showProfileModal.value = value;
};
</script>

<style scoped>
li {
  list-style: none;
  margin-left: 6px;
  font-weight: bold;
  font-size: 18px;
}

audio::-webkit-media-controls-panel {
  background-color: lightgray;
}

.body {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 55px);
  height: calc(100vh - 100px);
  border-style: ridge;
  border-width: 6px;
  border-color: grey;
  background-color: white;
  box-shadow: 12px 20px rgba(0, 0, 0, 0.72);
}

.grey-block {
  padding: 4px;
  border-style: solid;
  border-width: 1px;
  background-color: grey;
}

.header {
  flex: 1;
  padding: 4px;
  color: yellow;
  border-style: solid;
  border-width: 1px;
  border-color: blue;
  background-color: blue;
}

.side-profile {
  display: flex;
  border-style: solid;
  border-width: 1px;
}

.side-profile > span {
  padding: 4px;
}

.side-profile > span:hover {
  cursor: pointer;
  color: white;
  background-color: black;
}

.contents {
  overflow: auto;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: stretch;
}

.contents > * {
  flex: 1;
  border-left-style: solid;
  border-color: grey;
  border-left-width: 2px;
  background-color: lightgray;
}

.section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.folders {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 4px;
  padding: 0;
  height: 100%;
}

.folder {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px;
}

.folder:hover {
  cursor: pointer;
  color: white;
  border-style: dotted;
  border-width: 2px;
  background-color: black;
}

.search-input {
  position: sticky;
  top: 0;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}

.info {
  flex: 1;
  margin-left: 4px;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}

.info-section {
  display: flex;
  padding: 4px;
  overflow-y: auto;
  border-color: gray;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}

.audio-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px;
}

.audio {
  flex: 4;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item {
  flex: 1;
  margin-left: 10px;
  padding: 10px;
}

.item:hover {
  background-color: gray;
  border-radius: 360px;
}

.logo {
  flex: 2;
  flex-grow: 0;
  max-width: 100%;
  margin: 0 4px 10px 4px;
  border-style: inset;
  border-width: 8px;
  background-color: black;
}

.add-track {
  margin: 0 4px 20px 4px;
}

/* NZ-999 */
</style>