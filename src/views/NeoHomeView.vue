<template>
  <div class="body">
    <div style="display: flex; width: 100%;">
      <span class="grey-block">-</span>
      <span class="header">C:\files\projects\audio_streamer\main\{{ defaultDir }}</span>
    </div>

    <div class="side-profile">
      <span @click="() => $router.push('credentials')" v-if="!isLoggedIn">Log In</span>
      <template v-else>
        <span @click="onProfileModalClick">Profile</span>
        <span @click="onExitModalClick">Exit</span>
      </template>
    </div>

    <div class="contents">
      <div class="section">
        <ul class="folders">
          <template v-for="item in _listItems" :key="item">
            <span v-if="item.render.value" class="folder" @click="onFolderClick(item)">
              <svg v-if="item.icon === 'folder'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
              </svg>
              <svg v-if="item.icon === 'file'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
              </svg>
              <li> {{ item.title }} </li>
            </span>
          </template>
        </ul>

        <div style="display: flex; flex-direction: column; min-height: 0;">
          <div style="margin-right: 4px; display: flex; justify-content: space-between; align-items: center;">
            <span style="text-decoration: underline; font-size: 18px; font-weight: bold; margin-left: 4px;">Top {{ maxItemsInTopList }} of the day:</span>
            <button @click="async () => await _getTracksWithTheMostViewsOfTheDay()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </button>
          </div>
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
        <template v-if="areItemsPopulated">
          <div style="display: flex; position: sticky; top: 0;">
            <input 
            type="text" 
            class="search-input" 
            placeholder="Search items" 
            v-model="searchInput" 
            @keydown.enter="onSearchItems">
            
            <button @click="onSearchItems">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
          
          <template v-if="defaultDir === 'discover'">
            <div style="margin-top: 4px; display: flex; flex-direction: column; height: 100%;">
              <div style="overflow-y: auto;">
                <span class="discover-label">Recommended:</span>
                <template v-for="recommendedItem in recommendedItems" :key="recommendedItem">
                  <component 
                  :is="componentType" 
                  :data="recommendedItem" 
                  @play="onTrackClick" 
                  @show-playlists="onPlaylistModalClick" 
                  @edit-track="onEditTrackClick" 
                  @play-tracks="onStartPlaylistClick" />
                </template>
              </div>
              <div style="flex: 2; overflow-y: auto;">
                <span class="discover-label" style="position: sticky; top: 0;">
                  From people you're following:
                </span>
                <template v-if="showLoadingText">
                  <span class="empty-list-label">Please wait...</span>
                </template>
                <template v-else>
                  <template v-for="item in items" :key="item">
                    <component 
                    :is="componentType" 
                    :data="item" 
                    @play="onTrackClick" 
                    @show-playlists="onPlaylistModalClick" 
                    @edit-track="onEditTrackClick" 
                    @play-tracks="onStartPlaylistClick" />
                  </template>
                </template>
              </div> 
            </div>
          </template>
          <template v-else>
            <template v-if="showLoadingText">
              <span class="empty-list-label">Please wait...</span>
            </template>
            <template v-else>
              <template v-for="item in items" :key="item">
                <component 
                :is="componentType" 
                :data="item" 
                @play="onTrackClick" 
                @show-playlists="onPlaylistModalClick" 
                @edit-track="onEditTrackClick" 
                @play-tracks="onStartPlaylistClick" />
              </template>
            </template>
          </template>          
        </template>
        
        <template v-else>
          <span class="empty-list-label">Ain't nobody here but us chickens</span>
        </template>
      </div>

      <div class="section">
        <div style="flex: 3;" class="info-section">
          <TrackInfoComponent 
          :trackData="selectedTrack" 
          :avatarUrl="selectedTrackUserAvatar"  
          @show-profile="onProfileModalClick" 
          @show-playlists="onPlaylistModalClick" />
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
            @timeupdate="$event => trackTime($event)" 
            @ended="() => ++currentIndex">
            </audio>

            <div style="display: flex; align-items: center;">
              <div class="item" @click="() => { loop = !loop }">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="black" :stroke-width="loop ? 1 : 0" width="20" height="20" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
                  <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                </svg>
              </div>
              <div class="item" @click="onCurrentPlaylistModalClick">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </div>
              <div class="item" @click="onDownloadTrackClick">
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
    @close-modal-top-level="onCloseProfileModalClick" />

    <ExitModalComponent 
    v-show="showExitModal" 
    @close-modal-top-level="onCloseExitModalClick" />
    
    <AddToPlaylistModalComponent 
    v-if="showPlaylistsModal" 
    :track-id="selectedTrackId" 
    @close-modal-top-level="onClosePlaylistModalClick" />
    
    <CurrentPlaylistModalComponent 
    v-show="showCurrentPlaylistModal" 
    :tracks="playlistTracks" 
    @close-modal-top-level="onCloseCurrentPlaylistModalClick" 
    @loop-playlist="(val) => loopPlaylist = val" 
    @clear-playlist="() => playlistTracks = []" />
    
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
//This is not kino
import { shallowRef, ref, onMounted, watch, provide, toRaw, readonly } from 'vue';
import { maxItemsInTopList, maxRecommendedItems } from '../constants/NumericConstants.js';
import { GetCredentials, FindTrack, SaveTrack, GetTracks } from '../functions/StorageHelper.js';
import { SearchPlaylists, SearchTracks } from '../functions/SearchHelper.js';

import noSignal from '../assets/no_signal.png';
import TrackService from '../services/TrackService.js';
import MediaService from '../services/MediaService.js';
import MemberSevice from '../services/MemberSevice.js';
import StatsService from '../services/StatsService.js';
import CaptionService from '../services/CaptionService.js';
import PlaylistService from '../services/PlaylistService.js';
import PredictService from '../services/PredictService.js';
import FollowerService from '../services/FollowerService.js';

import TrackInfoComponent from '../components/TrackInfoComponent.vue';
import TrackItemComponent from '../components/TrackItemComponent.vue';
import TrackItemEditableComponent from '../components/TrackItemEditableComponent.vue';
import PlaylistItemExpandableEditableComponent from '../components/PlaylistItemExpandableEditableComponent.vue';

import ProfileModalComponent from '../components/modals/ProfileModalComponent.vue';
import ExitModalComponent from '../components/modals/ExitModalComponent.vue';
import AddToPlaylistModalComponent from '../components/modals/AddToPlaylistModalComponent.vue';
import CurrentPlaylistModalComponent from '../components/modals/CurrentPlaylistModalComponent.vue';
import UploadTrackModalComponent from '../components/modals/UploadTrackModalComponent.vue';
import WelcomeModalComponent from '../components/modals/WelcomeModalComponent.vue';
import AboutModalComponent from '../components/modals/AboutModalComponent.vue';

onMounted(async () => {
  userId.value = await GetCredentials();
  isLoggedIn.value = !!userId.value;
  await _getTracksWithTheMostViewsOfTheDay();
});

const audio = ref(null);
//dealing with dynamic components now
//renaming tracks to items
const items = ref([]);
const copyOfItems = ref([]);
const recommendedItems = ref([]);
const componentType = shallowRef(TrackItemComponent);
const areItemsPopulated = ref(false);
//
const tracksOfTheDay = ref([]);
const closedCaption = ref([]);
const isLoggedIn = ref(false);
const userId = ref(0);
const defaultDir = ref('*.*');
const currentCaption = ref('...');
const showLoadingText = ref(false);
const loop = ref(false);
const url = ref(null);
const selectedTrack = ref({});
const selectedTrackId = ref(0);
const selectedTrackUserId = ref(0);
const selectedTrackUserAvatar = ref(noSignal);
const editTrackData = ref(null);
const refreshFeed = ref(false);
const searchInput = ref('');
const isDownloading = ref(false);

const currentIndex = ref(-1);
const playlistLength = ref(0);
const playlistTracks = ref([]);
const loopPlaylist = ref(false);

//Fun
//Modals
const showProfileModal = ref(false);
const showExitModal = ref(false);
const showPlaylistsModal = ref(false);
const showCurrentPlaylistModal = ref(false);
const showUploadTrackModal = ref(false);
const showWelcomeModal = ref(false);
const showAboutModal = ref(false);

watch(selectedTrack, async (track) => {
  if (!!track) {
    if (track.offline) {
      selectedTrack.value.thumbnail = track.thumbnail instanceof Blob ? 
        URL.createObjectURL(track.thumbnail) : track.thumbnail;
      url.value = URL.createObjectURL(track.url);
      return;
    }

    const response = await MemberSevice.GetMember(selectedTrack.value.memberId);
    const userData = response.objects[0];
    const payload = {
      src: userData.avatar,
      containerName: 'avatar',
      contentType: 'image/*',
    };
    selectedTrackUserAvatar.value = URL.createObjectURL(await MediaService.GetMedia(payload));
    //GetMedia returns a blob which renders readable stream useless unless the network setting is set to no throttling
    url.value = MediaService.GetMediaStream(track.url, 'media', 'audio/mpeg');
  }
});

watch(refreshFeed, async (value) => {
  if (!value) {
    return;
  }

  switch (defaultDir.value) {
    case 'home':
      items.value = await _getTracks();
    break;
    // case 'discover':
    // break;
    case 'my_tracks':
      items.value = await _getUserTracks(userId.value);
    break;
    case 'my_playlists':
      items.value = await _getUserPlaylists(userId.value);
    break;
    case 'storage':
      items.value = await _getStorageTracks();
    break;
  }

  areItemsPopulated.value = items.value.length !== 0;
  refreshFeed.value = false;
});

watch(currentIndex, async (index) => {
  if (playlistTracks.value.length === 0) {
    return;
  }

  if (index < playlistLength.value) {
    await onTrackClick(playlistTracks.value[index]);
  }
  else {
    currentIndex.value = loopPlaylist.value ? 0 : index;
  }
});

const _retrieveStats = async () => {
  if (!isLoggedIn.value) {
    return;
  }

  const trackId = selectedTrack.value.trackId;
  
  let payload = {};
  let response = await StatsService.GetStatsFromUserForTrack(userId.value, trackId);
  if (response.statusCode !== 200) {
    payload = {
      memberId: userId.value,
      trackId,
      tags: selectedTrack.value.tags,
    };
    response = await StatsService.AddStats(payload);
  }

  payload = {
    memberId: userId.value,
    trackId,
    rating: response.objects[0].rating,
  };

  await StatsService.UpdateStats(payload);
  await TrackService.IncreaseViewCount(trackId);
};

const _retrieveCaptions = async () => {
  if (selectedTrack.value.offline) {
    closedCaption.value = JSON.parse(selectedTrack.value.captions);
    return;
  }

  let captions = [];
  const hasCaptions = selectedTrack.value.hasCaptions;
  const captionsLength = selectedTrack.value.captionsLength;
  if (hasCaptions && captionsLength !== 0) {
    const response = await CaptionService.GetCaptionsByTrackId(selectedTrack.value.trackId);
    captions = JSON.parse(response.objects[0].captions);
  }
  closedCaption.value = captions;
};

const _getTracks = async () => {
  return await TrackService.GetTracks();
};

const _getTracksWithTheMostViewsOfTheDay = async () => {
  tracksOfTheDay.value = await TrackService.GetTracksWithTheMostViewsOfTheDay(maxItemsInTopList);
};

const _getRecommendedTracks = async (userId, limit) => {
  return await PredictService.GetRecommendedItems(userId, limit);
};

const _getTracksFromFollowings = async (userId) => {
  return await FollowerService.GetTracksFromFollowings(userId);
};

const _getUserTracks = async (userId) => {
  return await TrackService.GetTracksFromUserId(userId);
};

const _getUserPlaylists = async (userId) => {
  return await PlaylistService.GetUserPlaylists(userId);
};

const _getStorageTracks = async () => {
  return await GetTracks();
};

const setCurrentIndex = (value) => {
  currentIndex.value = value >= playlistLength.value ? 0 : value;
};

const notifyRefreshFeed = () => refreshFeed.value = true;

const autoPlayAudio = async (val) => {
  audio.value = val;
  if (!!audio.value && !!audio.value.src) {
    audio.value.autoplay = true;
  }
};

const trackTime = (e) => {
  const currentTime = e.target.currentTime;
  const captions = closedCaption.value;

  if (!!captions) {
    const item = captions.find(caption => {
      const timestamp = caption.timestamp;
      const duration = caption.duration;
      const length = timestamp + duration;
      return (currentTime >= timestamp && currentTime <= length);
    });

    currentCaption.value = !!item ? item.message : '...';
  }
};

const onSearchItems = async () => {
  if (!!searchInput.value) {
    switch (defaultDir.value) {
      case 'my_playlists':
        items.value = SearchPlaylists(copyOfItems.value, searchInput.value.trim());
      break;
      default:
        showLoadingText.value = true;
        items.value = await SearchTracks(copyOfItems.value, searchInput.value.trim());
        showLoadingText.value = false;
    }
    items.value = items.value.length !== 0 ? items.value : copyOfItems.value;
  }
  else {
    items.value = copyOfItems.value;
  }
}

const onFolderClick = async (item) => {
  defaultDir.value = item.icon === 'folder' ? item.title : '*.*';
  await item.func();
};

const onTrackClick = async (track) => {
  if (selectedTrack.value === track) {
    return;
  }

  selectedTrack.value = track;
  await _retrieveCaptions();
  await _retrieveStats();
};

const onStartPlaylistClick = async (value) => {
  playlistTracks.value = value;
  currentIndex.value = 0;
  playlistLength.value = playlistTracks.value.length;
  await onTrackClick(playlistTracks.value[currentIndex.value]);
};

const onDownloadTrackClick = async () => {
  if (!(!!selectedTrack.value && 
    !!selectedTrack.value.trackId && 
    !selectedTrack.value.offline)) 
  {
    return;
  }

  const currentTrack = selectedTrack.value;
  if (isDownloading.value) {
    alert(`Download for ${currentTrack.trackName} is in progress, please wait.`);
    return;
  }
  
  const found = await FindTrack({ trackId: currentTrack.trackId, });
  if (found) {
    console.log(`Found track with id: ${currentTrack.trackId}. Process terminated.`);
    return;
  }

  isDownloading.value = true;
  let payload = {
    src: currentTrack.url,
    containerName: 'media',
    contentType: 'audio/mpeg',
  };
  const trackBlob = await MediaService.GetMedia(payload);
  
  payload = {
    src: currentTrack.thumbnail,
    containerName: 'thumbnail',
    contentType: 'image/*',
  };
  const thumbnailBlob = await MediaService.GetMedia(payload);
  
  let captions = "[]";
  if (currentTrack.hasCaptions && currentTrack.captionsLength !== 0) {
    const response = await CaptionService.GetCaptionsByTrackId(currentTrack.trackId);
    captions = response.objects[0].captions;
  }
  payload = { 
    ...toRaw(currentTrack),
    url: trackBlob,
    thumbnail: thumbnailBlob,
    offline: true,
    captions,
  };
  const saved = await SaveTrack(payload);
  saved && alert(`Saved ${payload.trackName} to storage.`);
  isDownloading.value = false;
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
  { 
    title: 'home', 
    icon: 'folder', 
    render: shallowRef(true), 
    func: async () => { 
      items.value = await _getTracks();
      areItemsPopulated.value = items.value.length !== 0;
      copyOfItems.value = items.value;
      componentType.value = TrackItemComponent;
    } 
  }, 
  { 
    title: 'discover', 
    icon: 'folder', 
    render: isLoggedIn, 
    func: async () => {
      items.value = await _getTracksFromFollowings(userId.value);
      copyOfItems.value = items.value;
      recommendedItems.value = await _getRecommendedTracks(userId.value, maxRecommendedItems);
      areItemsPopulated.value = items.value.length !== 0 || recommendedItems.value.length !== 0;
      componentType.value = TrackItemComponent;
    } 
  }, 
  { 
    title: 'my_tracks', 
    icon: 'folder', 
    render: isLoggedIn, 
    func: async () => {
      items.value = await _getUserTracks(userId.value);
      areItemsPopulated.value = items.value.length !== 0;
      copyOfItems.value = items.value;
      componentType.value = TrackItemEditableComponent;
    }
  },
  { 
    title: 'my_playlists', 
    icon: 'folder', 
    render: isLoggedIn, 
    func: async () => {
      items.value = await _getUserPlaylists(userId.value);
      areItemsPopulated.value = items.value.length !== 0;
      copyOfItems.value = items.value;
      componentType.value = PlaylistItemExpandableEditableComponent;
    }
  }, 
  { 
    title: 'storage', 
    icon: 'folder', 
    render: shallowRef(true), 
    func: async () => { 
      items.value = await _getStorageTracks();
      areItemsPopulated.value = items.value.length !== 0;
      copyOfItems.value = items.value;
      componentType.value = TrackItemEditableComponent;
    }
  }, 
  { 
    title: 'welcome.txt', 
    icon: 'file', 
    render: shallowRef(true), 
    func: onWelcomeModalClick 
  }, 
  { 
    title: 'about.txt', 
    icon: 'file', 
    render: shallowRef(true), 
    func: onAboutModalClick 
  }, 
];

provide('track-readonly', readonly(currentIndex));

provide('track', {
  notifyRefreshFeed, 
  onTrackClick, 
  onPlaylistModalClick, 
  setCurrentIndex, 
});
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
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}

.info {
  flex: 1;
  margin-left: 4px;
  padding: 10px;
  font-size: 18px;
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

.discover-label {
  margin: 4px;
  padding: 2px;
  font-size: 22px;
  color: yellow;
  border-bottom-style: dotted;
  border-width: 2px;
  background-color: black;
  box-shadow: 4px 4px dimgray;
}

.empty-list-label {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
/* NZ-999 */
</style>