<template>
  <div class="info-body">
    <img class="thumbnail" alt="thumbnail" :src="thumbnail">

    <div style="display: flex;">
      <div style="flex: 1; width: 0;">
        <p class="title">{{ title }}</p>
        <p style="font-size: 18px;">Date uploaded: {{ uploadedDate }}</p>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <div style="display: flex; align-items: center;">
            <p style="font-size: 18px;;">Uploader:</p>
            <img alt="user's avatar" class="avatar" :src="avatar" @click="onAvatarClick">
          </div>
        
          <div style="display: flex;">
            <div class="item" @click="onRate">
              <span v-show="rating === defaultRatingValue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orangered" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>
              </span>
              <span v-show="rating === 0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>
              </span>
            </div>
            
            <div class="item" @click="onAddToPlaylist">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
              </svg>
            </div>

            <div class="item" @click="onShowDescription">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </div>

            <div class="item" @click="onShowArtistInfo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DescriptionModalComponent 
    v-show="showDescription" 
    :description="infoProps.trackData.description" 
    @close-modal-top-level="onCloseDescription" />

    <ArtistInfoModalComponent 
    v-if="showArtistInfo" 
    :artist="artist" 
    @close-modal-top-level="onCloseArtistInfo" />
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { computed, ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { credentialsRouteName } from '../constants/RouteConstants.js';
import { defaultRatingValue } from '../constants/NumericConstants.js';
import { fallbackPlaylistName, mimeImgPNG } from '../constants/StringConstants.js';
import { sysLocale, dateTimeFormatOptions } from '../constants/DateConstants.js';
import { Status } from '../constants/StatusConstants.js';
import { GetCredentials } from '../functions/StorageHelper.js';

import noSignal from '../assets/no_signal.png';

import StatsService from '../services/StatsService.js';
import PlaylistService from '../services/PlaylistService.js';
import ArtistService from '../services/ArtistService.js';

import DescriptionModalComponent from './modals/DescriptionModalComponent.vue';
import ArtistInfoModalComponent from './modals/ArtistInfoModalComponent.vue';

onMounted(async () => {
  userId.value = await GetCredentials();
});

const router = useRouter();

const userId = ref(null);
const trackId = ref(null);
const artist = ref(null);
const rating = ref(0);
const showDescription = ref(false);
const showArtistInfo = ref(false);

const emit = defineEmits(['show-profile', 'show-playlists']);

const infoProps = defineProps({
  trackData: {
    type: Object,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
});

watch(() => infoProps.trackData, async (track) => {
  if (track?.offline) {
    return;
  }

  const response = await ArtistService.GetArtistById(track.artistinfoId);
  artist.value = response.statusCode === Status.Ok ? response.objects[0] : null;

  trackId.value = track.trackId ?? 0;
  if (!!userId.value) {
    const response = await StatsService.GetStatsFromUserForTrack(userId.value, trackId.value);
    rating.value = response.statusCode === Status.Ok ? response.objects[0].rating : 0;
  }
});

const _handleStats = async () => {
  let response = await StatsService.GetStatsFromUserForTrack(userId.value, trackId.value);
  const stats = response.objects[0];

  const payload = {
    memberId: userId.value,
    trackId: trackId.value,
    genreId: infoProps.trackData.genreId,
    rating: stats.rating === defaultRatingValue ? 0 : defaultRatingValue,
    tags: infoProps.trackData.tags,
  };

  response = await StatsService.UpdateStats(payload);
  if (response.statusCode === Status.Ok) {
    rating.value = response.objects[0].rating;
  }
};

const onAvatarClick = () => {
  if (!(!!infoProps.trackData.memberId)) {
    return;
  }
  emit('show-profile', infoProps.trackData.memberId);
};

const onRate = async () => {
  if (!(!!userId.value)) {
    router.push(credentialsRouteName);
    return;
  }

  if (!(Object.keys(infoProps.trackData).length !== 0 && !infoProps.trackData?.offline)) {
    return;
  }

  //get stats (uId, tId)
  //see if stats exist
  //if not add
  //else update rate
  await _handleStats();
  const response = await PlaylistService.GetPlaylistByNameFromUser(userId.value, fallbackPlaylistName);
  if (response.statusCode === Status.Ok) {
    const playlist = response.objects[0];
    rating.value === defaultRatingValue ? 
      await PlaylistService.AddTrackToPlaylist(playlist.playlistId, trackId.value) : 
      await PlaylistService.RemoveTrackFromPlaylist(playlist.playlistId, trackId.value);
  }
}

const onAddToPlaylist = () => {
  if (!(!!userId.value)) {
    router.push(credentialsRouteName);
    return;
  }

  if (!(Object.keys(infoProps.trackData).length !== 0 && !infoProps.trackData?.offline)) {
    return;
  }
  emit('show-playlists', infoProps.trackData.trackId);
};

const onShowDescription = () => {
  if (!(Object.keys(infoProps.trackData).length !== 0)) {
    return;
  }

  showDescription.value = true
};
const onCloseDescription = (value) => showDescription.value = value;

const onShowArtistInfo = () => {
  if (!(Object.keys(infoProps.trackData).length !== 0)) {
    return;
  }

  showArtistInfo.value = true
};
const onCloseArtistInfo = (value) => showArtistInfo.value = value;

const title = computed(() => {
  if (!(!!infoProps.trackData.trackName)) {
    return 'Select a track';
  }
  const trackName = infoProps.trackData.trackName;
  const artistName = infoProps.trackData.artistName;
  return `${ trackName } - ${ artistName }`;
});

const thumbnail = computed(() => {
  if (!(!!infoProps.trackData.thumbnail)) {
    return noSignal;
  }
  return infoProps.trackData.thumbnail;
});

const avatar = computed(() => {
  if (!(!!infoProps.avatarUrl)) {
    return noSignal;
  }
  return infoProps.avatarUrl;
});

const uploadedDate = computed(() => {
  let date = null;
  if (!!infoProps.trackData.dateCreated) {
    date = infoProps.trackData.dateCreated + 'Z';
  }
  return new Date(date).toLocaleString(sysLocale, dateTimeFormatOptions);
});
</script>

<style scoped>
.info-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
}

.thumbnail {
  min-width: 0;
  max-width: 100%;
  min-height: 0;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  background-color: black;
}

@media (max-width: 912px) {
  .thumbnail {
    min-height: max-content;
  }
}

.title {
  margin-right: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  overflow: hidden;
}

.title:hover {
  overflow: auto;
}

.avatar {
  cursor: pointer;
  margin-top: 4px;
  margin-left: 4px;
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 10px;
  border-style: ridge;
  background-color: black;
}

.item {
  padding: 10px;
  border-radius: 4px;
  border-style: outset;
  border-width: 4px;
}

.item:not(:first-child) {
  margin-left: 10px;
}

.item:hover {
  cursor: pointer;
  border-style: inset;
}
</style>