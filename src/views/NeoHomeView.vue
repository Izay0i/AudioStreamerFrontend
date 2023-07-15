<template>
  <div class="body">
    <div class="header-body">
      <span class="grey-block">-</span>
      <span class="header">C:\files\projects\audio_streamer\main\{{ defaultDir }}</span>
    </div>

    <div class="side-profile">
      <span @click="() => router.push(credentialsRouteName)" v-if="!isLoggedIn">Log In</span>
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
              <template v-if="item.icon === 'folder'">
                <svg v-if="item.title === 'home'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
                </svg>
                <svg v-if="item.title === 'discover'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-compass-fill" viewBox="0 0 16 16">
                  <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.503 7.503 0 0 1 5.538 7.24zm-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z"/>
                </svg>
                <svg v-if="item.title === 'my_tracks'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-disc-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-6 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM4 8a4 4 0 0 1 4-4 .5.5 0 0 0 0-1 5 5 0 0 0-5 5 .5.5 0 0 0 1 0zm9 0a.5.5 0 1 0-1 0 4 4 0 0 1-4 4 .5.5 0 0 0 0 1 5 5 0 0 0 5-5z"/>
                </svg>
                <svg v-if="item.title === 'my_playlists'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-cassette-fill" viewBox="0 0 16 16">
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h.191l1.862-3.724A.5.5 0 0 1 4 10h8a.5.5 0 0 1 .447.276L14.31 14h.191a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13ZM4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM6 6a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1Z"/>
                  <path d="m13.191 14-1.5-3H4.309l-1.5 3h10.382Z"/>
                </svg>
                <svg v-if="item.title === 'storage'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-hdd-fill" viewBox="0 0 16 16">
                  <path d="M0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM.91 7.204A2.993 2.993 0 0 1 2 7h12c.384 0 .752.072 1.09.204l-1.867-3.422A1.5 1.5 0 0 0 11.906 3H4.094a1.5 1.5 0 0 0-1.317.782L.91 7.204z"/>
                </svg>
              </template>
              <template v-if="item.icon === 'file'">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-filetype-txt" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-2v-1h2a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.928 15.849v-3.337h1.136v-.662H0v.662h1.134v3.337h.794Zm4.689-3.999h-.894L4.9 13.289h-.035l-.832-1.439h-.932l1.228 1.983-1.24 2.016h.862l.853-1.415h.035l.85 1.415h.907l-1.253-1.992 1.274-2.007Zm1.93.662v3.337h-.794v-3.337H6.619v-.662h3.064v.662H8.546Z"/>
                </svg>
              </template>
              <li>{{ item.title }}</li>
            </span>
          </template>
        </ul>

        <div style="display: flex; flex-direction: column; min-height: 0; height: 100%;">
          <div style="margin-right: 4px; display: flex; justify-content: space-between; align-items: flex-end;">
            <span class="discover-label">Most viewed:</span>
            <button @click="async () => await _getTracksWithTheMostViewsOfTheDay()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </button>
          </div>
          <div class="top-list">
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
        <template v-if="areItemsPopulated || showLoadingText">
          <div style="display: flex; position: sticky; top: 0; z-index: 1;">
            <input 
            type="text" 
            class="search-input" 
            placeholder="Search items" 
            v-model="searchInput" 
            @keydown.enter="onSearchItems">
            
            <select style="border-radius: 0;" name="genres" v-model="selectedGenreId" @change="onSelectGenre">
              <option value="0">All</option>
              <template v-for="genre in genresList" :key="genre">
                <option :value="genre.genreId">{{ genre.genreName }}</option>
              </template>
            </select>

            <button style="border-top-left-radius: 0; border-bottom-left-radius: 0;" @click="onSearchItems">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
          
          <template v-if="defaultDir === 'discover'">
            <div style="margin-top: 4px; display: flex; flex-direction: column; height: 100%;">
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="discover-label">Trending:</span>

                  <select style="margin-right: 4px;" name="genres" v-model="selectedTrendingGenreId" @change="onSelectTrendingGenre">
                    <option value="0">All</option>
                    <template v-for="genre in genresList" :key="genre">
                      <option :value="genre.genreId">{{ genre.genreName }}</option>
                    </template>
                  </select>
                </div>
                
                <template v-if="showLoadingText">
                  <span class="empty-list-label">Please wait...</span>
                </template>
                <template v-else>
                  <template v-for="recommendedItem in recommendedItems" :key="recommendedItem">
                    <component 
                    :is="componentType" 
                    :data="recommendedItem" 
                    @play="onTrackClick" 
                    @show-playlists="onPlaylistModalClick" 
                    @edit-track="onEditTrackClick" 
                    @play-tracks="onStartPlaylistClick" />
                  </template>
                </template>
              </div>
              <div style="flex: 2;">
                <div style="display: flex; align-items: center;">
                  <span class="discover-label">
                    From people you're following:
                  </span>
                </div>
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
        <div class="info-section">
          <TrackInfoComponent 
          :trackData="selectedTrack" 
          :avatarUrl="selectedTrackUserAvatar"  
          @show-profile="onProfileModalClick" 
          @show-playlists="onPlaylistModalClick" />
        </div>

        <div class="audio-section">
          <canvas ref="canvas" class="visualizer"></canvas>
          
          <textarea 
          readonly 
          spellcheck="false" 
          autocorrect="off" 
          autocapitalize="off" 
          class="caption">{{ currentCaption }}</textarea>

          <div class="audio">
            <audio 
            controls 
            controlslist="nodownload" 
            crossorigin="anonymous" 
            ref="audio" 
            :key="url" 
            :loop="loop" 
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
import { useRouter } from 'vue-router';
import { credentialsRouteName } from '../constants/RouteConstants.js';
import { maxItemsInTopList, maxRecommendedItems, noCategoryGenreId } from '../constants/NumericConstants.js';
import { mediaContainerName, thumbnailContainerName, avatarContainerName, mimeImgAny, mimeSndMP3 } from '../constants/StringConstants';
import { Status } from '../constants/StatusConstants.js';
import { GetCredentials, FindTrack, SaveTrack, GetTracks } from '../functions/StorageHelper.js';
import { SearchPlaylists, SearchTracks } from '../functions/SearchHelper.js';
import { useAVLine } from 'vue-audio-visual';

import noSignal from '../assets/no_signal.png';
import TrackService from '../services/TrackService.js';
import MediaService from '../services/MediaService.js';
import MemberSevice from '../services/MemberSevice.js';
import StatsService from '../services/StatsService.js';
import CaptionService from '../services/CaptionService.js';
import PlaylistService from '../services/PlaylistService.js';
import FollowerService from '../services/FollowerService.js';
import GenreService from '../services/GenreService.js';

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
  genresList.value = await GenreService.GetGenres();
});

const router = useRouter();

const audio = ref(null);
const canvas = ref(null);

//items are dynamic components
const items = ref([]);
const copyOfItems = ref([]);
const recommendedItems = ref([]);
const componentType = shallowRef(TrackItemComponent);
const areItemsPopulated = ref(false);
//
const genresList = ref([]);
//0: All
const selectedGenreId = ref(0);
const selectedTrendingGenreId = ref(0);

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

watch(url, (url) => {
  useAVLine(audio, canvas, { 
    src: url, 
    lineColor: 'dimgray', 
  });
});

watch(audio, (value) => {
  if (!(!!value && !!value.src)) {
    return;
  }
  value.autoplay = true;
});

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
      containerName: avatarContainerName,
      contentType: mimeImgAny,
    };
    selectedTrackUserAvatar.value = URL.createObjectURL(await MediaService.GetMedia(payload));
    //GetMedia returns a blob, on slower network it can be a bit problematic
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
  const trackId = selectedTrack.value.trackId;
  
  let payload = {};
  let response = await StatsService.GetStatsFromUserForTrack(userId.value, trackId);
  if (response.statusCode !== Status.Ok) {
    payload = {
      memberId: userId.value,
      trackId,
      genreId: selectedTrack.value.genreId,
      tags: selectedTrack.value.tags,
    };
    response = await StatsService.AddStats(payload);
  }

  payload = {
    memberId: userId.value,
    trackId,
    genreId: response.objects[0].genreId,
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
  return await loadingWrapper(TrackService.GetTracks());
};

const _getTracksWithTheMostViewsOfTheDay = async () => {
  tracksOfTheDay.value = await TrackService.GetTracksWithTheMostViewsOfTheDay(maxItemsInTopList);
};

const _getTrendingTracks = async (genreId, limit) => {
  return await loadingWrapper(StatsService.GetTopTracksWithMostViewsAndLikesFromGenre(limit, genreId));
};

const _getTracksFromFollowings = async (userId) => {
  return await loadingWrapper(FollowerService.GetTracksFromFollowings(userId));
};

const _getUserTracks = async (userId) => {
  return await loadingWrapper(TrackService.GetTracksFromUserId(userId));
};

const _getUserPlaylists = async (userId) => {
  return await loadingWrapper(PlaylistService.GetUserPlaylists(userId));
};

const _getStorageTracks = async () => {
  return await loadingWrapper(GetTracks());
};

const loadingWrapper = async (promise, condition = showLoadingText) => {
  condition.value = true;
  const result = await promise;
  condition.value = false;
  return result;
};

const setCurrentIndex = (value) => {
  currentIndex.value = value >= playlistLength.value ? 0 : value;
};

const notifyRefreshFeed = () => refreshFeed.value = true;

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

    currentCaption.value = !!item ? item.message : '';
  }
};

const getTracksOfGenre = (genreId) => {
  if (genreId !== 0) {
    return copyOfItems.value.filter(item => item.genreId === genreId);
  }
  else {
    return copyOfItems.value;
  }
};

const onSelectGenre = () => {
  if (defaultDir.value !== 'my_playlists') {
    items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
  }
};

const onSelectTrendingGenre = async () => {
  recommendedItems.value = await _getTrendingTracks(selectedTrendingGenreId.value, maxRecommendedItems);
};

const onSearchItems = async () => {
  if (!!searchInput.value) {
    switch (defaultDir.value) {
      case 'my_playlists':
        items.value = SearchPlaylists(copyOfItems.value, searchInput.value.trim());
      break;
      default:
        items.value = await loadingWrapper(
          SearchTracks(
            copyOfItems.value, 
            searchInput.value.trim(), 
            parseInt(selectedGenreId.value)));
    }
    items.value = items.value.length !== 0 ? 
      items.value : getTracksOfGenre(parseInt(selectedGenreId.value));
  }
  else {
    items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
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
  isLoggedIn.value && await _retrieveStats();
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
    alert('Track already downloaded.');
    return;
  }

  isDownloading.value = true;
  let payload = {
    src: currentTrack.url,
    containerName: mediaContainerName,
    contentType: mimeSndMP3,
  };
  const trackBlob = await MediaService.GetMedia(payload);
  
  payload = {
    src: currentTrack.thumbnail,
    containerName: thumbnailContainerName,
    contentType: mimeImgAny,
  };
  const thumbnailBlob = await MediaService.GetMedia(payload);
  
  let captions = '[]';
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

const onCurrentPlaylistModalClick = () => {
  if (!isLoggedIn.value) {
    router.push(credentialsRouteName);
    return;
  }
  showCurrentPlaylistModal.value = true
};
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

      items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
    } 
  }, 
  { 
    title: 'discover', 
    icon: 'folder', 
    render: isLoggedIn, 
    func: async () => {
      items.value = await _getTracksFromFollowings(userId.value);
      copyOfItems.value = items.value;
      recommendedItems.value = await _getTrendingTracks(selectedTrendingGenreId.value, maxRecommendedItems);
      areItemsPopulated.value = items.value.length !== 0 || recommendedItems.value.length !== 0;
      componentType.value = TrackItemComponent;

      items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
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

      items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
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

      items.value = getTracksOfGenre(parseInt(selectedGenreId.value));
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
  loadingWrapper,
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

.header-body {
  display: flex;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('../assets/backgrounds/discs.jpg');
  background-repeat: repeat;
  background-size: cover;
  background-position: center center;
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
  font-size: 18px;
  color: yellow;
  border-style: solid;
  border-width: 1px;
  border-color: black;
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
  min-width: 0;
  min-height: 0;
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
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: white;
}

.info-section {
  flex: 3;
  display: flex;
  min-width: 0;
  min-height: 0;
  padding: 4px;
  overflow-y: auto;
  border-color: gray;
  border-bottom-style: solid;
  border-bottom-width: 2px;
}

.audio-section {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px;
}

.visualizer {
  flex: 2;
  min-width: 0;
  min-height: 0;
  color: dimgray;
  border-color: dimgray;
  border-style: double double none double;
  border-radius: 4px 4px 0 0;
  border-width: 6px;
  background-color: black;
}

.caption {
  flex: 3;
  margin-left: 0;
  padding: 10px;
  font-size: 18px;
  text-align-last: center;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  border-color: dimgray;
  border-style: none double double double;
  border-radius: 0 0 4px 4px;
  border-width: 6px;
  background-color: black;
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
  border-radius: 4px;
  border-style: outset;
  border-width: 4px;
}

.item:hover {
  cursor: pointer;
  border-style: inset;
}

.top-list {
  margin: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-radius: 4px;
  border-style: inset;
  border-width: 4px;
  background-color: white;
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('../assets/backgrounds/vinyl.jpg');
  background-repeat: repeat;
  background-size: cover;
  background-position: center center;
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

.top-list-label {
  font-style: italic;
  font-size: 20px;
  font-weight: bold;
  margin-left: 4px;
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