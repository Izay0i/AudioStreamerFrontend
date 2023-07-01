<template>
  <div class="track-body">
    <div style=" flex: 1; display: flex; align-items: center;" @click="() => { onSelectTrack(); onPlayInPlaylist(); }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      </svg>
      <span style="margin-left: 4px;">
        {{ manipulated.title }} - {{ manipulated.artistName }}
      </span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <template v-if="track.data.captionsLength !== 0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-badge-cc" viewBox="0 0 16 16">
          <path d="M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727v-.743zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.743z"/>
          <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
        </svg>
      </template>
      <div style="margin-left: 4px;">
        <template v-if="!isInPlaylist">
          <svg @click="onSelectShowPlaylists" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
          </svg>
        </template>
        <template v-else-if="isInPlaylist && track.playlistName !== fallbackPlaylistName">
          <svg @dblclick="onRemoveFromPlaylistClick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="darkred" class="bi bi-folder-minus" viewBox="0 0 16 16">
            <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
            <path d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { credentialsRouteName } from '../constants/RouteConstants.js';
import { maxVisibleStringLength } from '../constants/NumericConstants.js';
import { GetCredentials } from '../functions/StorageHelper.js';
import { fallbackPlaylistName } from '../constants/StringConstants';

const router = useRouter();

defineOptions({
  inheritAttrs: false,
});

const track = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isInPlaylist: {
    type: Boolean,
    default: false,
  },
  playlistName: {
    type: String,
    default: '',
  },
  index: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['play', 'show-playlists', 'remove-from-playlist', 'play-in-playlist']);

const manipulated = computed(() => {
  if (track.data == null) {
    return {
      title: 'Foo',
      artistName: 'Bar',
    };
  }
  return {
    //prune
    title: track.data.trackName.length > maxVisibleStringLength ? 
      `${ track.data.trackName.slice(0, maxVisibleStringLength) }...` : track.data.trackName,
    artistName: track.data.artistName.length > maxVisibleStringLength ? 
      `${ track.data.artistName.slice(0, maxVisibleStringLength) }...` : track.data.artistName,
  };
});

const onSelectTrack = () => {
  emit('play', track.data);
}

const onSelectShowPlaylists = async () => {
  const isLoggedIn = !!await GetCredentials();
  if (!isLoggedIn) {
    router.push(credentialsRouteName);
    return;
  }
  emit('show-playlists', track.data.trackId);
};

const onRemoveFromPlaylistClick = () => {
  emit('remove-from-playlist', track.data.trackId);
};

//Yeah im running out of names
const onPlayInPlaylist = () => {
  emit('play-in-playlist', track.index);
};
</script>

<style scoped>
.track-body {
  margin: 8px 4px 4px 4px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
}

.track-body > span {
  margin-left: 6px;
}

.track-body:hover {
  cursor: pointer;
  color: white;
  border-style: dotted;
  border-width: 2px;
  background-color: black;
}
</style>