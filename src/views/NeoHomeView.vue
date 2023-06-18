<template>
  <div class="body">
    <div style="display: flex; width: 100%;">
      <span class="grey-block">-</span>
      <span class="header">C:\files\projects\audio_streamer\main\{{ defaultDir }}</span>
    </div>

    <div class="side-profile">
      <span @click="() => $router.push('credentials')" v-if="!isLoggedIn">LogIn</span>
      <template v-else>
        <span @click="onProfileModalClick">Profile</span>
        <span @click="onExitModalClick">Exit</span>
      </template>
    </div>

    <div class="contents">
      <div class="section">
        <ul class="folders">
          <span class="folder" v-for="(item, _) in _listItems" @click="onFolderClick(item)">
            <svg v-if="item.icon === 'folder'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
            </svg>
            <svg v-if="item.icon === 'file'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
            </svg>
            <li> {{ item.title }} </li>
          </span>
        </ul>

        <div style="flex: 1; display: flex; flex-direction: column; min-height: 0;">
          <span style="text-decoration: underline; font-size: 18px; font-weight: bold; margin-left: 4px;">Top 5 of the day:</span>
          <div style="margin: 4px; display: flex; flex-direction: column; overflow: auto; border-style: inset; border-width: 6px; background-color: white;">
            <TrackItemComponent 
            v-for="track in tracksOfTheDay" 
            :key="track" 
            :data="track" 
            @play="onTrackClick" 
            @show-playlists="onPlaylistModalClick" />
          </div>
        </div>

        <div style="flex: 1; display: flex; align-items: flex-end;">
          <button class="add-track" @click="onUploadTrackModalClick" v-if="isLoggedIn">Upload track</button>
        </div>
      </div>
      
      <div class="section" style="overflow-y: auto;">
        <input type="text" class="search-input" placeholder="Search" @keydown.enter="">
        <TrackItemComponent 
        v-for="(track, _) in tracks" 
        :key="track" 
        :data="track" 
        @play="onTrackClick" 
        @show-playlists="onPlaylistModalClick" />
      </div>

      <div class="section">
        <div style="flex: 3;" class="info-section">
          <TrackInfoComponent 
          :trackData="selectedTrack" 
          :avatarUrl="selectedTrackUserAvatar"  
          @show-profile="onProfileModalClick" 
          @show-playlists="onPlaylistModalClick"/>
        </div>

        <div style="flex: 1;" class="audio-section">
          <textarea readonly class="info" style="margin-left: 0; flex: 1; text-align-last: center;">{{ currentCaption }}</textarea>
          
          <div class="audio">
            <audio 
            controls 
            controlslist="nodownload" 
            :key="url" 
            :loop="loop" 
            :ref="autoPlayAudio" 
            :src="url" 
            @timeupdate="trackTime($event)" 
            @play="console.log('audio clicked')">
              <!-- <source :src="url" type="audio/mpeg"> -->
            </audio>

            <div style="display: flex; align-items: center;">
              <div class="item" @click="() => loop = !loop">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="black" :stroke-width="loop ? 1 : 0" width="20" height="20" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
                  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                </svg>
              </div>
              <div class="item" @click="onCurrentPlaylistModalClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </div>
              <div class="item" @click="">
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

    <!-- Modals -->
    <ProfileModalComponent 
    :user-id="selectedTrackUserId" 
    v-if="showProfileModal" 
    @close-modal-top-level="onCloseProfileModalClick" 
    @show-playlists-top-level="onPlaylistModalClick" 
    @play-track="onTrackClick" />

    <ExitModalComponent 
    v-show="showExitModal" 
    @close-modal-top-level="onCloseExitModalClick" />
    
    <AddToPlaylistModalComponent 
    v-show="showPlaylistsModal" 
    :track-id="selectedTrackId" 
    @close-modal-top-level="onClosePlaylistModalClick" />
    
    <CurrentPlaylistModalComponent 
    v-show="showCurrentPlaylistModal" 
    @close-modal-top-level="onCloseCurrentPlaylistModalClick" 
    @play-track="onTrackClick" :tracks="tracks" />
    
    <UploadTrackModalComponent 
    v-if="showUploadTrackModal" 
    :track="editTrackData" 
    @close-modal-top-level="onCloseUploadTrackModalClick" />
    
    <WelcomeModalComponent 
    v-show="showWelcomeModal" 
    @close-modal-top-level="onCloseWelcomeModalClick" />
    
    <AboutModalComponent 
    v-show="showAboutModal" 
    @close-modal-top-level="onCloseAboutModalClick" />
    <!-- Modals -->
  </div>
</template>

<script setup>
//times like this makes me want to try out nuxt.js just to not deal with this
import { ref, onMounted, watch } from 'vue';
import { maxItemsInTopList } from '../constants/NumericConstants.js';
import { GetCredentials } from '../functions/StorageHelper.js';

import noSignal from '../assets/no_signal.png';
import TrackService from '../services/TrackService.js';
import MediaService from '../services/MediaService.js';
import MemberSevice from '../services/MemberSevice.js';
import StatsService from '../services/StatsService.js';
import CaptionService from '../services/CaptionService.js';
import Track from '../objects/Track.js';
import ClosedCaption from '../objects/ClosedCaption.js';
import TrackItemComponent from '../components/TrackItemComponent.vue';
import TrackItemEditableComponent from '../components/TrackItemEditableComponent.vue';
import TrackInfoComponent from '../components/TrackInfoComponent.vue';

import ProfileModalComponent from '../components/modals/ProfileModalComponent.vue';
import ExitModalComponent from '../components/modals/ExitModalComponent.vue';
import AddToPlaylistModalComponent from '../components/modals/AddToPlaylistModalComponent.vue';
import CurrentPlaylistModalComponent from '../components/modals/CurrentPlaylistModalComponent.vue';
import UploadTrackModalComponent from '../components/modals/UploadTrackModalComponent.vue';
import WelcomeModalComponent from '../components/modals/WelcomeModalComponent.vue';
import AboutModalComponent from '../components/modals/AboutModalComponent.vue';

onMounted(async () => {
  isLoggedIn.value = await GetCredentials() != null;
  tracks.value = await TrackService.GetTracks();
  tracksOfTheDay.value = await TrackService.GetTracksWithTheMostViewsOfTheDay();
  tracksOfTheDay.value.length = Math.min(tracksOfTheDay.value.length, maxItemsInTopList);

  
});

const audio = ref(null);
const tracks = ref([]);
const tracksOfTheDay = ref([]);
const closedCaption = ref(new ClosedCaption());
const isLoggedIn = ref(false);
const defaultDir = ref('*.*');
const currentCaption = ref('...');
const loop = ref(false);
const url = ref(null);
const selectedTrack = ref(null);
const selectedTrackId = ref(0);
const selectedTrackUserId = ref(0);
const selectedTrackUserAvatar = ref(noSignal);
const editTrackData = ref(null);

//Fun
//Modals
const showProfileModal = ref(false);
const showExitModal = ref(false);
const showPlaylistsModal = ref(false);
const showCurrentPlaylistModal = ref(false);
const showUploadTrackModal = ref(false);
const showWelcomeModal = ref(false);
const showAboutModal = ref(false);

watch(selectedTrack, async (value) => {
  if (!!value) {
    const response = await MemberSevice.GetMember(selectedTrack.value.memberId);
    const userData = response.objects[0];
    const payload = {
      src: userData.avatar,
      containerName: 'avatar',
      contentType: 'image/*',
    };
    selectedTrackUserAvatar.value = URL.createObjectURL(await MediaService.GetMedia(payload));

    //GetMedia returns a blob which renders readable stream useless unless the network setting is set to no throttling
    url.value = MediaService.GetMediaStream(value.url, 'media', 'audio/mpeg');
  }
});

const _retrieveStats = async () => {
  if (!isLoggedIn.value) {
    return;
  }

  const userId = await GetCredentials();
  const trackId = selectedTrack.value.trackId;
  
  let payload = {};
  let response = await StatsService.GetStatsFromUserForTrack(userId, trackId);
  if (response.statusCode !== 200) {
    payload = {
      memberId: userId,
      trackId,
      tags: selectedTrack.value.tags,
    };
    response = await StatsService.AddStats(payload);
  }

  payload = {
    memberId: userId,
    trackId,
    rating: response.objects[0].rating,
  };

  await StatsService.UpdateStats(payload);
  await TrackService.IncreaseViewCount(trackId);
};

const autoPlayAudio = async (val) => {
  audio.value = val;
  if (!!audio.value && audio.value.src !== '') {
    await audio.value.play();
  }
};

const trackTime = (e) => {
  const currentTime = e.target.currentTime;
  const captions = closedCaption.value.captions;

  if (!!captions) {
    const item = captions.timestamps?.find(caption => {
      const timestamp = caption.timestamp;
      const length = timestamp + caption.duration;
      return (currentTime >= timestamp && currentTime <= length);
    });

    currentCaption.value = !!item ? item.caption : '...';
  }
};

const onFolderClick = (item) => {
  defaultDir.value = item.icon === 'folder' ? item.title : '*.*';
  item.func();
};

const onTrackClick = async (track) => {
  selectedTrack.value = track;
  await _retrieveStats();

  //GET CLOSED CAPTION IF THERE IS ONE
  //WHY ARE YOU YELLING???
  //BECAUSE YOU KEEP FORGETTING YOUR PRIORITY
  //UNDERSTANDABLE
  const response = await CaptionService.GetCaptionsByTrackId(selectedTrack.value.trackId);
  closedCaption.value = !!response.objects ? response.objects[0] : new ClosedCaption();
};

const onEditTrackClick = (track) => {
  editTrackData.value = track;
  showUploadTrackModal.value = true;
};

const onProfileModalClick = (value) => {
  selectedTrackUserId.value = typeof value === 'number' ? value : 0;
  showProfileModal.value = true;
};
const onCloseProfileModalClick = (value) => showProfileModal.value = value;

const onExitModalClick = () => showExitModal.value = true;
const onCloseExitModalClick = (value) => showExitModal.value = value;

const onPlaylistModalClick = (value) => {
  showPlaylistsModal.value = true;
  selectedTrackId.value = value;
};
const onClosePlaylistModalClick = (value) => showPlaylistsModal.value = value;

const onCurrentPlaylistModalClick = () => showCurrentPlaylistModal.value = true;
const onCloseCurrentPlaylistModalClick = (value) => showCurrentPlaylistModal.value = value;

const onUploadTrackModalClick = () => showUploadTrackModal.value = true;
const onCloseUploadTrackModalClick = (value) => {
  editTrackData.value = null;
  showUploadTrackModal.value = value;
};

const onWelcomeModalClick = () => showWelcomeModal.value = true;
const onCloseWelcomeModalClick = (value) => showWelcomeModal.value = value;

const onAboutModalClick = () => showAboutModal.value = true;
const onCloseAboutModalClick = (value) => showAboutModal.value = value;

const _listItems = [
  { title: 'home', icon: 'folder', func: () => {} }, 
  { title: 'discover', icon: 'folder', func: () => {} }, 
  // { title: 'timeline', icon: 'folder', func: () => {} }, 
  { title: 'storage', icon: 'folder', func: () => {} }, 
  { title: 'welcome.txt', icon: 'file', func: onWelcomeModalClick }, 
  { title: 'about.txt', icon: 'file', func: onAboutModalClick }, 
];
</script>

<style scoped>
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
  text-align: center;
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
  border-style: outset;
  border-width: 4px;
}

.item:hover {
  cursor: pointer;
  /* background-color: gray; */
  border-style: inset;
}

.add-track {
  margin: 0 4px 20px 4px;
}

/* NZ-999 */
</style>