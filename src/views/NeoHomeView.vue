<template>
  <div class="body">
    <div style="display: flex; width: 100%;">
      <span class="grey-block">-</span>
      <span class="header">C:\files\projects\audio_streamer\main\{{ defaultDir }}</span>
    </div>

    <div class="side-profile">
      <span>Profile</span>
      <span>Stats</span>
      <span>Exit</span>
    </div>

    <div class="contents">
      <div class="section">
        <ul class="folders">
          <span class="folder" v-for="(item, _) in listItems" @click="onFolderClick(item.title)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
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
        <TrackItemComponent v-for="(track, index) in mockTrackObjects" :key="index" :data="track" />
      </div>

      <div class="section">
        <div style="flex: 3;" class="info-section">
          <div style="flex: 1; display: flex; flex-direction: column;">
            <img :src=unicorn class="thumbnail">
            <p style="font-weight: bold; font-size: 22px;">Penelope - Sawano Hiroyuki</p>
            <span>Date: {{ mockDate() }}</span>

            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span>By:</span>
              <img :src=unicorn class="avatar">
            </div>
            
            <div style="display: flex;">
              <button style="flex: 100;">Add to playlist</button>
              <!-- <button>Rate</button> -->
              <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>
              </div>
            </div>
          </div>

          <textarea readonly class="info">
            {{ mockText() }}
          </textarea>
        </div>

        <div style="flex: 1;" class="audio-section">
          <textarea readonly class="info" style="margin-left: 0; flex: 1; text-align-last: center;">
            What's so much fun about driving on the mountain?
            Ugh! Watch your fig, doofus! You drive as fast as you can, challenging the corners!
            The corners, huh?
            That's really the kind of thing you do for fun?
            I wouldn't be doing it if it was boring! Look, you're dude, right, and you're telling you don't feel the unquenchable desire to tackle those raging air-bends?
            I don't know...
          </textarea>
          
          <div class="audio">
            <audio controls controlslist="nodownload" style="flex: 1;">
              <source :src=mockTrackObject.url type="audio/mpeg">
            </audio>

            <div style="flex: ; display: flex;">
              <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </div>
              <div class="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Track from '../objects/Track.js';
import logo from '../assets/wordart.png';
import unicorn from '../assets/unicorn.jpg';
import TrackItemComponent from '../components/TrackItemComponent.vue';

const defaultDir = ref('*.*');

const mockTrackObject = new Track(
  1, 1, 
  'Penelope', 'Sawano Hiroyuki', 'From the Hathaway\'s Flash movie', 
  'https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_penelope_20230519T170042218.mp3&containerName=media&contentType=audio%2Fmpeg', 
  '', 
  [], 
  new Date()
);

const mockDate = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  return `${ month} ${ date.getDate() } ${ date.getFullYear() }`;
};

const mockTrackObjects = [
  mockTrackObject, 
  mockTrackObject, 
];

const mockText = () => {
  const synopsis = `Mobile Suit Gundam Unicorn (機動戦士ガンダムUCユニコーン Kidō Senshi Gandamu Yunikōn?) 
  is 2010 theatrical OVA series based on the novel series of the same name written by Japanese author Harutoshi Fukui, 
  with character and mechanical designs provided by Yoshikazu Yasuhiko and Hajime Katoki, 
  respectively, and music by Hiroyuki Sawano. 
  The story begins in UC 0001, at the very beginning of human space colonization, with the Laplace terror incident, 
  a major event that influences the course of human history forever. 
  The main story takes place in UC 0096, three years after the events of Mobile Suit Gundam: Char's Counterattack 
  and seventeen years after the One Year War.`;
  return synopsis;
};

const listItems = [
  { title: '[..]' }, 
  { title: 'Home' }, 
  { title: 'Discover' }, 
  { title: 'Timeline' }, 
  { title: 'Storage' }, 
];

const onFolderClick = (title) => {
  defaultDir.value = title.toLowerCase();
};
</script>

<style scoped>
li {
  list-style: none;
  margin-left: 6px;
  font-weight: bold;
  font-size: 18px;
}

button {
  padding: 6px;
  font-size: 16px;
  border-style: outset;
  border-width: 5px;
  border-radius: 0;
  border-color: grey;
}

button:active {
  border-style: inset;
}

button:disabled {
  border-style: outset;
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
  margin-right: 10px;
  padding: 4px;
}

.side-profile > span:hover {
  cursor: pointer;
  color: white;
  background-color: black;
}

.contents {
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

.search-input:focus {
  outline: none;
}

.info-section {
  display: flex;
  padding: 4px;
  overflow-y: auto;
  border-color: gray;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: black;
}

.avatar {
  margin-left: 4px;
  width: 20%;
  height: auto;
  object-fit: contain;
  border-radius: 360px;
  background-color: black;
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

.audio-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px;
}

.audio {
  flex: 1;
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
</style>