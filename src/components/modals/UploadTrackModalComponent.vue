<template>
  <ModalComponent :width="80" :z-index="2" title="Upload" @close-modal="onModalClose">
    <div class="section">
      <form class="form">
        <label for="name">Name:</label>
        <input id="name" type="text" placeholder="Track name" v-model="trackInputValue">
        
        <label for="artist">Artist:</label>
        <input id="artist" type="text" placeholder="Artist's name" v-model="artistInputValue">
        <button @click.prevent="onShowArtistsListModalClick">
          <div style="display: flex; justify-content: center; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
              <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
              <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
            </svg>
            <p>- {{ selectedArtistName }}</p>
          </div>
        </button>

        <label for="description">Description: (Optional)</label>
        <textarea 
        id="description" 
        placeholder="Description" 
        rows="6" 
        spellcheck="false" 
        autocorrect="off" 
        autocapitalize="off" 
        v-model="desInputValue"></textarea>
        
        <label for="genres">Genre:</label>
        <select id="genres" name="genres" v-model="selectedGenreId">
          <template v-for="genre in genresList" :key="genre">
            <option :value="genre.genreId">{{ genre.genreName }}</option>
          </template>
        </select>

        <template v-if="!isEditable">
          <label for="track">Track:</label>
          <input id="track" type="file" accept=".webm, .ogg, .mp3, .wav" @change="(e) => trackFileInput = e.target.files[0]">
        </template>

        <label for="thumbnail">Thumbnail: (Optional)</label>
        <input id="thumbnail" type="file" accept=".webp, .jpeg, .jpg, .png, .gif" @change="(e) => thumbnailFileInput = e.target.files[0]">
      </form>

      <button style="margin: 4px" v-if="isEditable" @click="onSaveChangesClick">Save changes</button>
      <button style="margin: 4px" v-if="!isEditable" @click="onUploadClick">Upload</button>
    </div>

    <div class="section" v-if="isEditable">
      <textarea readonly class="info">{{ currentCaption }}</textarea>

      <div class="audio">
        <audio 
        controls 
        controlslist="nodownload" 
        :loop="loop" 
        :src="trackUrl" 
        @loadedmetadata="(e) => audioDuration = e.target.duration"
        @timeupdate="(e) => { trackTime(e); timestamp = e.target.currentTime; }">
        </audio>

        <div style="display: flex; align-items: center;">
          <div class="item" @click="() => loop = !loop">
            <svg xmlns="http://www.w3.org/2000/svg" stroke="black" :stroke-width="loop ? 1 : 0" width="20" height="20" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
              <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
            </svg>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; margin: 4px;">
        <form style="display: flex; margin-bottom: 4px;">
          <input type="number" min="0" step="0.000001" placeholder="timestamp" readonly v-model="timestamp">
          <input 
          type="number" 
          min="0" 
          step="0.000001" 
          placeholder="duration" 
          v-model="duration">
          <textarea placeholder="caption" style="width: 100%;" v-model="caption">{{ caption }}</textarea>
        </form>
        <div style="display: flex; justify-content: space-between;">
          <div style="display: flex; margin-right: 4px;">
            <template v-if="!isTranscribing && !isDoneTranscribing">
              <button style="display: flex; align-items: center; color: white; border-color: blueviolet; background-color: blueviolet;" @click="onTranscribeClick">
                <span style="margin-right: 4px;">Transcribe</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z"/>
                </svg>
                <span style="margin-left: 4px;">Indev</span>
              </button>

              <div style="display: flex; flex-direction: column; justify-content: space-between; margin-left: 4px;">
                <span>Into:</span>
                <select name="languages" v-model="selectedLanguageInputValue">
                  <option disabled value="">Select a language</option>
                  <template v-for="language in LanguageTags" :key="language">
                    <option :value="language.value">{{ language.description }}</option>
                  </template>
                </select>
              </div>
            </template>

            <template v-if="isTranscribing">
              <button style="display: flex; align-items: center; color: black; background-color: yellow;" disabled>
                <span style="margin-right: 4px;">Transcribing...</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 16 16">
                  <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                  <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                </svg>
              </button>
            </template>
            
            <template v-if="isDoneTranscribing">
              <button style="display: flex; align-items: center; color: black; background-color: white;" @click="onRollbackClick">
                <span style="margin-right: 4px;">Rollback</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </button>
            </template>
          </div>
          <div style="display: flex;">
            <button :disabled="isTranscribing" @click="onAddCaptionClick">Add caption</button>
            <button 
            style="margin-left: 4px; color: white; border-color: darkred; background-color: darkred;" 
            :disabled="isTranscribing" 
            @click="onRemoveCaptionsClick">
              Remove captions
            </button>
          </div>
        </div>
      </div>

      <div class="captions">
        <div class="table-header">
          <span>Timestamp</span>
          <span>Duration</span>
          <span>Caption</span>
        </div>

        <CaptionItemComponent 
        v-for="(item, index) in captions" 
        :key="index" 
        :index="index" 
        :data="item" 
        @remove-caption="(index) => captions.splice(index, 1)" />
      </div>

      <div style="display: flex; margin: 4px;">
        <button style="flex: 1;" @click="onSaveCaptionsClick">Save captions</button>
      </div>
    </div>
    <div class="section" v-else>
      <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <span style="font-size: 30px;">Captions are available after upload</span>
      </div>
    </div>
  </ModalComponent>

  <AddArtistInfoModalComponent 
  v-if="showArtistsListModal" 
  @close-modal-top-level="onCloseArtistsListModalClick" />
</template>

<script setup>
import { ref, onMounted, watch, provide, inject, computed } from 'vue';
import { minNameLength, maxNameLength, maxFileSize, oneMegaByte, maxAllowedDuration } from '../../constants/NumericConstants.js';
import { mediaContainerName, thumbnailContainerName } from '../../constants/StringConstants.js';
import { LanguageTags } from '../../constants/LanguageTagsConstants.js';
import { Status } from '../../constants/StatusConstants.js';
import { GetCredentials } from '../../functions/StorageHelper.js';

import Caption from '../../objects/Caption.js';

import TrackService from '../../services/TrackService.js';
import CaptionService from '../../services/CaptionService.js';
import ArtistService from '../../services/ArtistService.js';
import GenreService from '../../services/GenreService.js';
import MediaService from '../../services/MediaService.js';
import StatsService from '../../services/StatsService.js';

import ModalComponent from './ModalComponent.vue';
import AddArtistInfoModalComponent from './AddArtistInfoModalComponent.vue';
import CaptionItemComponent from '../CaptionItemComponent.vue';

onMounted(async () => {
  const track = props.track;
  isEditable.value = !!track;

  const response = await ArtistService.GetArtistName(!!track ? track.artistinfoId : selectedArtistId.value);
  selectedArtistName.value = response.objects[0];
  artistInputValue.value = response.objects[0];

  genresList.value = await GenreService.GetGenres();
  
  //assign track props to inputs
  if (isEditable.value) {
    trackInputValue.value = track.trackName;
    artistInputValue.value = track.artistName;
    desInputValue.value = track.description;
    
    selectedGenreId.value = track.genreId;
    selectedArtistId.value = track.artistinfoId;
    
    trackUrl.value = MediaService.GetMediaStream(track.url, 'media', 'audio/mpeg');

    //fetch closed captions/subtitles
    hasCaptions.value = track.hasCaptions;
    let obj = [];
    if (hasCaptions.value && track.captionsLength !== 0) {
      const response = await CaptionService.GetCaptionsByTrackId(track.trackId);
      obj = JSON.parse(response.objects[0].captions);
    }
    captions.value = obj;
    copyOfCaptions.value = [ ...obj ];
  }
});

const { notifyRefreshFeed } = inject('track');

const audioDuration = ref(0.0);
const isEditable = ref(false);
const isProcessingData = ref(false);
const isTranscribing = ref(false);
const isDoneTranscribing = ref(false);
const isSavingCaptions = ref(false);
const hasCaptions = ref(false);
const loop = ref(false);
const currentCaption = ref('...');
const timestamp = ref(0.0);
const duration = ref(0.0);
const caption = ref('');
const captions = ref([]);
const copyOfCaptions = ref([]);
const trackUrl = ref(null);
const genresList = ref([]);
//1: default - Uncategorized
const selectedGenreId = ref(1);
//1: default - Unknown artist
const selectedArtistId = ref(1);
const selectedArtistName = ref('');
const showArtistsListModal = ref(false);

//inputs
const trackInputValue = ref('');
const artistInputValue = ref('');
const desInputValue = ref('');
const tagsInputValue = ref('');
const selectedLanguageInputValue = ref('');

const trackFileInput = ref(null);
const thumbnailFileInput = ref(null);

const props = defineProps({
  track: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close-modal-top-level']);

watch([trackInputValue, trackFileInput], ([trackName, trackFile]) => {
  if (!!trackFile && trackInputValue.value === '') {
    trackInputValue.value = trackFile.name;
  }
});

const maxUploadSize = computed(() => {
  return Math.floor(maxFileSize / oneMegaByte);
});

const maxAllowedDurationInMinutes = computed(() => {
  return Math.floor(maxAllowedDuration / 60.0);
});

const _convertTagsToArray = () => {
  if (!(!!tagsInputValue.value && typeof tagsInputValue.value === 'string')) {
    return;
  }

  const tags = tagsInputValue.value.replace(/\s+/g, '').split(',');
  const tagsArr = [];
  tags.forEach(tag => !!tag && tagsArr.push(tag.toLocaleLowerCase()));
  return tagsArr;
};

const trackTime = (e) => {
  const currentTime = e.target.currentTime;
  const item = captions.value?.find(caption => {
    const timestamp = caption.timestamp;
    const duration = caption.duration;
    const length = timestamp + duration;

    return (currentTime >= timestamp && currentTime <= length);
  });

  currentCaption.value = !!item ? item.message : '';
};

const setArtistValues = (obj) => {
  selectedArtistId.value = obj.id;
  selectedArtistName.value = obj.name;
  artistInputValue.value = obj.name;
};

const onShowArtistsListModalClick = () => showArtistsListModal.value = true;
const onCloseArtistsListModalClick = (value) => showArtistsListModal.value = value;

const onUploadClick = async () => {
  let canUpload = !!trackInputValue.value && !!artistInputValue.value && !!trackFileInput.value;
  if (trackInputValue.value.length < minNameLength || trackInputValue.value.length > maxNameLength) {
    alert(`First name input must be within ${ minNameLength } - ${ maxNameLength } characters.`);
    canUpload = false;
  }
  if (artistInputValue.value.length < minNameLength || artistInputValue.value.length > maxNameLength) {
    alert(`Second name input be within ${ minNameLength } - ${ maxNameLength } characters.`);
    canUpload = false;
  }
  if (!canUpload) {
    alert(`Must include an audio file.`);
    return;
  }
  if (trackFileInput.value.size > maxFileSize) {
    console.log(trackFileInput.value.size);
    alert(`File size must not exceed ${ maxUploadSize.value }MB.`);
    return;
  }

  if (isProcessingData.value) {
    alert(`Uploading track, please wait.`);
    return;
  }

  isProcessingData.value = true;

  const userId = await GetCredentials();

  let payload = {
    memberId: userId,
    containerName: mediaContainerName,
    file: trackFileInput.value, 
  };
  let response = await MediaService.UploadMedia(payload);
  const trackFilePath = response.objects[0];

  let thumbnailFilePath = '';
  if (!!thumbnailFileInput.value) {
    if (thumbnailFileInput.value.size <= maxFileSize) {
      payload = {
        memberId: userId,
        containerName: thumbnailContainerName,
        file: thumbnailFileInput.value, 
      };
      response = await MediaService.UploadMedia(payload);
      thumbnailFilePath = response.objects[0];
    }
    else {
      alert(`Thumbnail size must not exceed ${ maxUploadSize.value }MB.`);
    }
  }

  payload = {
    memberId: userId,
    genreId: selectedGenreId.value,
    artistinfoId: selectedArtistId.value,
    trackName: trackInputValue.value,
    artistName: artistInputValue.value,
    description: desInputValue.value,
    url: trackFilePath,
    thumbnail: thumbnailFilePath,
  };

  response = await TrackService.AddTrack(payload);
  response.statusCode === Status.Created && notifyRefreshFeed();

  isProcessingData.value = false;

  alert(response.message);
};

const onSaveChangesClick = async () => {
  let canUpload = !!trackInputValue.value && !!artistInputValue.value;
  if (trackInputValue.value.length < minNameLength || trackInputValue.value.length > maxNameLength) {
    alert(`First name input must be within ${ minNameLength } - ${ maxNameLength } characters.`);
    canUpload = false;
  }
  if (artistInputValue.value.length < minNameLength || artistInputValue.value.length > maxNameLength) {
    alert(`Second name input must be within ${ minNameLength } - ${ maxNameLength } characters.`);
    canUpload = false;
  }
  if (!canUpload) {
    return;
  }

  if (isProcessingData.value) {
    alert(`Updating track, please wait.`);
    return;
  }

  isProcessingData.value = true;

  let payload = {};
  let response;
  let thumbnailFilePath = '';
  
  const track = props.track;

  if (!!thumbnailFileInput.value) {
    if (thumbnailFileInput.value.size <= maxFileSize) {
      if (!!track.thumbnail) {
        payload = {
          url: track.thumbnail,
          containerName: thumbnailContainerName,
        };
        await MediaService.DeleteMedia(payload);
      }
      payload = {
        memberId: track.trackId,
        containerName: thumbnailContainerName,
        file: thumbnailFileInput.value, 
      };
      response = await MediaService.UploadMedia(payload);
      thumbnailFilePath = response.objects[0];
    }
    else {
      alert(`Thumbnail size must not exceed ${ maxUploadSize.value }MB.`);
    }
  }

  payload = {
    trackId: track.trackId,
    genreId: selectedGenreId.value,
    artistinfoId: selectedArtistId.value,
    trackName: trackInputValue.value,
    artistName: artistInputValue.value,
    description: desInputValue.value,
    thumbnail: !!thumbnailFilePath ? thumbnailFilePath : track.thumbnail,
    hasCaptions: track.hasCaptions,
    captionsLength: track.captionsLength,
  };

  response = await TrackService.UpdateTrack(payload);
  response.statusCode === Status.Ok && notifyRefreshFeed();

  isProcessingData.value = false;

  await StatsService.ChangeGenreOfTrack(track.trackId, selectedGenreId.value);

  alert(response.message);
};

const onTranscribeClick = async () => {
  alert('This feature is experimental, as such it should be used sparingly.');
  alert('For a more accurate transcription, choose the most common spoken language used in the track.');
  if (selectedLanguageInputValue.value === '') {
    alert('Please select a language first.');
    return;
  }
  if (audioDuration.value > maxAllowedDuration) {
    alert(`Only tracks that are no longer than ${ maxAllowedDurationInMinutes.value } minutes are allowed at this time.`);
    return;
  }

  let confirmStartTranscription = false;
  let message = `[WARNING] This process may take up to ${ maxAllowedDurationInMinutes.value } minutes to complete.`;
  alert(message);
  message = '[WARNING] This will override your current captions.';
  alert(message);
  message = '[WARNING] This process can only be run once per session; once started, it cannot be stopped. Do you still wish to continue?';
  confirmStartTranscription = confirm(message);

  if (!confirmStartTranscription) {
    alert('Process aborted.');
    return;
  }

  isTranscribing.value = true;

  captions.value = [];
  await MediaService.Transcribe(captions, props.track.url, selectedLanguageInputValue.value);

  isTranscribing.value = false;
  isDoneTranscribing.value = true;
};

const onRollbackClick = () => {
  const message = 'Do you want to rollback?';
  if (!confirm(message)) {
    return;
  }
  captions.value = [ ...copyOfCaptions.value ];
};

const onAddCaptionClick = () => {
  if (duration.value < 0 || caption.value.trim() === '') {
    alert('Values must not be empty or invalid (duration|subtitle)');
    return;
  }

  const obj = new Caption(timestamp.value, duration.value, caption.value);
  captions.value.push(obj);

  //reset
  duration.value = 0.0;
  caption.value = '';
};

const onRemoveCaptionsClick = () => {
  const message = 'Remove captions?';
  if (!confirm(message)) {
    return;
  }
  captions.value = [];
};

const onSaveCaptionsClick = async () => {
  if (isSavingCaptions.value || isTranscribing.value) {
    alert(`Updating subtitles, please wait.`);
    return;
  }
  
  isSavingCaptions.value = true;

  let response;
  let captionId;
  let payload = {};

  const track = props.track;

  if (hasCaptions.value) {
    response = await CaptionService.GetCaptionsByTrackId(props.track.trackId);
    captionId = response.objects[0].captionId;
  }
  else {
    payload = {
      trackId: track.trackId,
    };
    response = await CaptionService.AddCaptions(payload);
    if (response.statusCode === Status.Created) {
      captionId = response.objects[0];
      hasCaptions.value = true;
    }
  }

  payload = {
    captionId,
    captions: JSON.stringify(captions.value),
  };
  response = await CaptionService.UpdateCaptions(payload);
  response.statusCode === Status.Ok && notifyRefreshFeed();
  
  //Update tracks
  payload = {
    trackId: track.trackId,
    trackName: track.trackName,
    artistName: track.artistName,
    hasCaptions: hasCaptions.value,
    captionsLength: captions.value.length,
  };
  await TrackService.UpdateTrack(payload);
  //

  isSavingCaptions.value = false;

  alert(response.message);
};

const onModalClose = (value) => {
  if (isProcessingData.value || 
    isSavingCaptions.value || 
    isTranscribing.value) 
  {
    alert(`One or more processes are currently running, please wait.`);
    return;
  }
  emit('close-modal-top-level', value);
};

provide('upload', {
  setArtistValues,
  onCloseArtistsListModalClick,
});
</script>

<style scoped>
.section {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form {
  margin: 4px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
}

.form > *:not(input[type="file"]) {
  margin-top: 6px;
  padding: 6px;
}

.info {
  flex: 2;
  text-align-last: center;
  font-size: 18px;
  margin: 4px;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
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
  border-radius: 4px;
  border-style: outset;
  border-width: 4px;
}

.item:hover {
  cursor: pointer;
  border-style: inset;
}

.captions {
  flex: 10;
  margin: 4px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border-style: inset;
  border-width: 6px;
  background-color: white;
}

.table-header {
  position: sticky;
  top: 0;
  padding: 6px;
  display: flex;
  border-bottom-style: solid;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  background-color: white;
  z-index: 999;
}

.table-header > span {
  flex: 1;
}
</style>