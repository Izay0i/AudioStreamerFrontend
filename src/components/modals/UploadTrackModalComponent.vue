<template>
  <ModalComponent :width="80" title="Upload" @close-modal="onModalClose">
    <div class="section">
      <form class="form">
        <label for="track">Name:</label>
        <input id="track" type="text" placeholder="Track name" v-model="trackInputValue">
        <label for="artist">Artist:</label>
        <input id="artist" type="text" placeholder="Artist's name" v-model="artistInputValue">
        <label for="description">Description:</label>
        <textarea id="description" placeholder="Description" v-model="desInputValue"></textarea>
        
        <template v-if="!isEditable">
          <label>Track:</label>
          <input type="file" accept=".ogg, .mp3, .wav" @change="(e) => trackFileInput = e.target.files[0]">
        </template>

        <label>Thumbnail: (Optional)</label>
        <input type="file" accept=".jpeg, .jpg, .png, .gif" @change="(e) => thumbnailFileInput = e.target.files[0]">
        <label for="tags">Tags (Optional):</label>
        <input id="tags" type="text" placeholder="tag1, tag2" v-model="tagsInputValue">
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
        @timeupdate="(e) => { trackTime(e); timestamp = e.target.currentTime; }">
          <source :src="trackUrl" type="audio/mpeg">
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
        <form style="display: flex;">
          <input type="number" min="0" step="0.000001" placeholder="timestamp" readonly v-model="timestamp">
          <input 
          type="number" 
          min="0" 
          step="0.000001" 
          placeholder="duration" 
          v-model="duration">
          <textarea placeholder="subtitle" style="width: 100%;" v-model="caption">{{ caption }}</textarea>
        </form>
        <button @click="onAddCaptionClick">Add subtitle</button>
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
        @remove-caption="(index) => captions.splice(index, 1)"/>
      </div>

      <div style="display: flex; margin: 4px;">
        <button style="flex: 1;" @click="onSaveCaptionsClick">Save subtitles</button>
      </div>
    </div>
    <div class="section" v-else>
      <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
        <span style="font-size: 30px;">Subtitles are available after upload</span>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Track from '../../objects/Track.js';
import Caption from '../../objects/Caption.js';
import TrackService from '../../services/TrackService.js';
import CaptionService from '../../services/CaptionService.js';
import StatsService from '../../services/StatsService.js';
import ModalComponent from './ModalComponent.vue';
import CaptionItemComponent from '../CaptionItemComponent.vue';
import { GetCredentials } from '../../functions/StorageHelper';
import MediaService from '../../services/MediaService';

onMounted(() => {
  const track = props.track
  isEditable.value = track !== null;
  //assign track props to inputs
  if (isEditable.value) {
    trackInputValue.value = track.trackName;
    artistInputValue.value = track.artistName;
    desInputValue.value = track.description;
    tagsInputValue.value = track.tags;

    trackUrl.value = track.url;

    //fetch closed captions/subtitles
    //captions.value = 
  }
});

const isEditable = ref(true);
const loop = ref(false);
const currentCaption = ref('...');
const timestamp = ref(0.0);
const duration = ref(0.0);
const caption = ref('');
const captions = ref([]);
const trackUrl = ref(null);

//inputs
const trackInputValue = ref('');
const artistInputValue = ref('');
const desInputValue = ref('');
const tagsInputValue = ref('');

const trackFileInput = ref(null);
const thumbnailFileInput = ref(null);

const onSaveChangesClick = () => {
  //call API
};

const onUploadClick = async () => {
  const canUpload = !!trackInputValue.value && !!artistInputValue.value && !!trackFileInput.value;
  if (!canUpload) {
    console.log('cant upload');
    return;
  }
  //call API
  const userId = await GetCredentials();

  let payload = {
    memberId: userId,
    containerName: 'media',
    file: trackFileInput.value, 
  };
  let response = await MediaService.UploadMedia(payload);
  const trackFilePath = response.objects[0];

  let thumbnailFilePath = '';
  if (!!thumbnailFileInput.value) {
    payload = {
      memberId: userId,
      containerName: 'thumbnail',
      file: thumbnailFileInput.value, 
    };
    response = await MediaService.UploadMedia(payload);
    thumbnailFilePath = response.objects[0];
  }

  payload = {
    memberId: userId,
    trackName: trackInputValue.value,
    artistName: artistInputValue.value,
    description: desInputValue.value,
    url: trackFilePath,
    thumbnail: thumbnailFilePath,
    tags: !!tagsInputValue.value ? JSON.stringify(tagsInputValue.value) : [],
  };

  response = await TrackService.AddTrack(payload);
  console.log(response);
};

const onAddCaptionClick = () => {
  if (duration.value < 0 || caption.value.trim() === '') {
    return;
  }

  const obj = new Caption(timestamp.value, duration.value, caption.value);
  captions.value.push(obj);

  //reset
  duration.value = 0.0;
  caption.value = '';
};

const onSaveCaptionsClick = () => {
  //call API
};

const trackTime = (e) => {
  const currentTime = e.target.currentTime;
  const item = captions.value?.find(caption => {
    const timestamp = caption.timestamp;
    const length = timestamp + caption.duration;

    return (currentTime >= timestamp && currentTime <= length);
  }) ?? null;

  currentCaption.value = !!item ? item.caption : '...';
};

const props = defineProps({
  track: {
    type: Track,
    default: null,
  }
});

const emit = defineEmits(['close-modal-top-level']);

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
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
  text-align-last: center;
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
  border-style: outset;
  border-width: 4px;
}

.item:hover {
  cursor: pointer;
  border-style: inset;
}

.captions {
  flex: 2;
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
  justify-content: space-between;
  border-bottom-style: solid;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  background-color: white;
  z-index: 999;
}
</style>