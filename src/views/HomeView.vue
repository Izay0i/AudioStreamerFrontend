<template>
  <div class="body">
    <div class="tabs">
      <span>C:\files\project\audio_streamer\main\{{ title }}</span>
      <ul class="tabs-header">
        <li v-for="(item, _) in items" @click="itemClick(item)">
          {{ item.title }}
        </li>
      </ul>

      <div class="main">
        <div class="tabs-body">
          <MusicComponent v-for="n in 20" v-bind="mockTrackObj" @play-track="trackClick"></MusicComponent>
        </div>
        
        <div style="display: flex; flex-direction: column;">
          <div class="item">
            <ProfileComponent></ProfileComponent>
          </div>
          <div class="item">Search & top list</div>
          <div class="item">
            
            Playlist
          </div>

          <audio controls controlslist="nodownload" :key="testUrl" ref="audio">
            <source :src="testUrl" type="audio/mpeg">
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import ProfileComponent from '../components/ProfileComponent.vue';
import MusicComponent from '../components/MusicComponent.vue';

const mockTrackObj = {
  trackId: 1,
  memberId: 1,
  trackName: 'Test name',
  artistName: 'Test artist name',
  description: 'Hello',
  url: 'https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_Vigilante_20230523T124248985.mp3&containerName=media&contentType=audio%2Fmpeg',
  thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1024px-SMPTE_Color_Bars.svg.png',
};

const items = ref([
  { title: 'home' }, 
  { title: 'for_you' }, 
  { title: 'history' },  
  { title: 'storage' },
]);

const audio = ref(null);

const title = ref('');

const itemClick = (item) => {
  title.value = item.title;
};

const testUrl = ref('');

const trackClick = (url) => {
  testUrl.value = url;
};

watchEffect(() => {
  if (audio.value) {
    let playPromise = audio.value.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(err => {
        console.log(err);
      });
    }
  }
});
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.main {
  display: flex;
}

.main > * {
  flex: 1;
}

.tabs {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
  width: 100%;
  height: 100%;
  background-color: grey;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  box-shadow: 8px 10px rgba(0, 0, 0, 0.72);
}

.tabs > span {
  padding: 4px;
  color: yellow;
  background-color: darkblue;
  border-style: solid;
  border-color: black;
  border-width: 0 0 2px 0;
}

.tabs-header {
 display: flex;
 list-style: none;
}

.tabs-header > li {
  padding: 6px 20px;
  text-align: center;
  border-style: outset;
  border-width: 4px;
  cursor: pointer;
  /* transition: all 0.4s ease-out; */
  background-color: lightgray;
  /* box-shadow: 4px 6px rgba(0, 0, 0, 0.72); */
}

.tabs-header > li:hover {
  background-color: gray;
}

.tabs-body {
  position: relative;
  overflow: auto;
  width: 512px;
  height: calc(100vh - 175px);
  /* height: 100%; */
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border-style: solid;
  border-width: 1px;
  /* box-shadow: 4px 8px rgba(0, 0, 0, 0.72); */
  background-color: white;
}

.tabs-body > * {
  flex: 1;
  width: 100%;
  /* max-height: 100%; */
}

.item {
  position: relative;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  min-width: 100px;
  min-height: 100px;
  margin-right: 40px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  /* box-shadow: 4px 6px rgba(0, 0, 0, 0.72); */
}
</style>