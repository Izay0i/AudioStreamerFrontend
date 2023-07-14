<template>
  <div 
  class="track-body" v-bind:style="{ 
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + thumbnail + ')' }" 
  :title="information">
    <div class="select-body">
      <div @click="onSelectTrack"></div>
      <span class="title" @click="onSelectTrack">{{ title }}</span>

      <div class="items">
        <template v-if="track.data.captionsLength !== 0 || (track.data.offline && track.data.captions !== '[]')">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-badge-cc" viewBox="0 0 16 16">
            <path d="M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727v-.743zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.743z"/>
            <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
          </svg>
        </div>
        </template>
        <template v-if="!offlineMode">
          <svg @click="onSelectShowPlaylists" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
          </svg>

          <svg @click="onEditClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>

          <svg @click="onRemoveTrackClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
          </svg>
        </template>
        <template v-else>
          <svg @click="onStorageRemoveTrackClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-database-x" viewBox="0 0 16 16">
            <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z"/>
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z"/>
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';
import { sysLocale, dateTimeFormatOptions } from '../constants/DateConstants.js';
import { Status } from '../constants/StatusConstants.js';
import { RemoveTrack } from '../functions/StorageHelper.js';
import noSignal from '../assets/no_signal.png';
import TrackService from '../services/TrackService.js';
import StatsService from '../services/StatsService.js';
import MediaService from '../services/MediaService';
import CaptionService from '../services/CaptionService';

onMounted(() => {
  offlineMode.value = track.data.offline;
});

const { notifyRefreshFeed } = inject('track');

const offlineMode = ref(false);

defineOptions({
  inheritAttrs: false,
});

const track = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'play', 
  'show-playlists', 
  'edit-track', 
]);

const information = computed(() => {
  const formattedDate = new Date(track.data.dateCreated + 'Z').toLocaleString(sysLocale, dateTimeFormatOptions);
  return `Title: ${track.data.trackName}
Artist: ${track.data.artistName}
Date uploaded: ${formattedDate}`;
});

const title = computed(() => {
  return !!track.data ? track.data.trackName : 'FUBAR';
});

const thumbnail = computed(() => {
  if (!!track.data.thumbnail) {
    var thumbnail = track.data.thumbnail;
    return track.data.offline ? noSignal : thumbnail;
  }
});

const onSelectTrack = () => {
  emit('play', track.data);
}

const onSelectShowPlaylists = async () => {
  emit('show-playlists', track.data.trackId);
};

const onEditClick = () => {
  emit('edit-track', track.data);
};

const onRemoveTrackClick = async () => {
  const message = `Remove ${track.data.trackName}?`;
  if (!confirm(message)) {
    return;
  }

  if (track.data.hasCaptions) {
    let response = await CaptionService.GetCaptionsByTrackId(track.data.trackId);
    const captionId = response.objects[0].captionId;
    await CaptionService.DeleteCaptions(captionId);
  }
  
  await StatsService.DeleteStatsOfTrack(track.data.trackId);
  
  let payload = {
    src: track.data.url,
    containerName: 'media',
  };
  await MediaService.DeleteMedia(payload);
  
  if (!!track.data.thumbnail) {
    payload = {
      src: track.data.thumbnail,
      containerName: 'thumbnail',
    };
    await MediaService.DeleteMedia(payload);
  }
  
  response = await TrackService.DeleteTrack(track.data.trackId);
  response.statusCode === Status.Ok && notifyRefreshFeed();
  alert(response.message);
};

const onStorageRemoveTrackClick = async () => {
  const message = `Remove ${track.data.trackName}?`;
  if (!confirm(message)) {
    return;
  }

  await RemoveTrack(track.data);
  notifyRefreshFeed();
};
</script>

<style scoped>
.track-body {
  position: relative;
  top: 0;
  cursor: pointer;
  min-width: 0;
  margin: 8px 4px 4px 4px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  background-color: black;
  background-repeat: repeat;
  background-size: cover;
  background-position: center center;
  transition: top ease 0.35s;
  z-index: 0;
}

.track-body > span {
  margin-left: 6px;
}

.track-body:hover {
  top: -10px;
  color: white;
}

.select-body {
  flex: 1;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-left: 4px;
  color: white;
  text-align: center;
}

.items {
  display: flex;
  flex-direction: column;
}

.items > * {
  margin: 4px;
}
</style>