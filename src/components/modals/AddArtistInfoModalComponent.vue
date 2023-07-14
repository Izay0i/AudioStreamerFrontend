<template>
  <ModalComponent :width="50" :height="60" :z-index="4" title="Artists" @close-modal="onModalClose">
    <div class="section">
      <img class="thumbnail" :src="thumbnailSrc">

      <form class="form">
        <input 
        type="file" 
        accept=".webp, .jpeg, .jpg, .png, .gif" 
        @change="onFileChange">

        <label for="name">Full name:</label>
        <input id="name" type="text" placeholder="Name" v-model="fullNameInput">

        <label for="link">External link: (Optional)</label>
        <input id="link" type="text" placeholder="e.g: https://..." v-model="externalLinkInput">

        <label for="description">Biography: (Optional)</label>
        <textarea 
        id="description" 
        placeholder="Description" 
        rows="6" 
        spellcheck="false" 
        autocorrect="off" 
        autocapitalize="off" 
        v-model="descriptionInput"></textarea>
      </form>

      <template v-if="!isInEditMode">
        <button style="margin: 4px;" @click="onSumbit">Submit</button>
      </template>
      <template v-else>
        <div style="display: flex; margin: 4px;">
          <button style="flex: 1;" @click="onSaveChanges">Save changes</button>
          <button 
          style="flex: 1; color: white; background-color: darkred;" 
          @click="onDiscard">
            Discard
          </button>
        </div>
      </template>
    </div>
    <div class="section">
      <div style="display: flex; position: sticky; top: 0; z-index: 1;">
        <input 
        type="text" 
        class="search-input" 
        placeholder="Search artists" 
        v-model="searchInput" 
        @keydown.enter="onSearchArtists">

        <button style="border-top-left-radius: 0; border-bottom-left-radius: 0;" @click="onSearchArtists">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>

      <template v-if="!isSearching">
        <template v-for="artist in artists" :key="artist">
          <ArtistItemComponent 
          :artist="artist" 
          @select-artist="(value) => onSelectArtist(value)" 
          @edit-click="onEditInfo" />
        </template>
      </template>
      <template v-else>
        <span class="empty-list-label">Please wait...</span>
      </template>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import { minNameLength, maxDisplayNameLength, maxFileSize, oneMegaByte } from '../../constants/NumericConstants.js';
import { artistContainerName, mimeImgAny } from '../../constants/StringConstants.js';
import { Status } from '../../constants/StatusConstants.js';
import { SearchArtists } from '../../functions/SearchHelper.js';
import { GetCredentials } from '../../functions/StorageHelper.js';

import ArtistService from '../../services/ArtistService.js';
import MediaService from '../../services/MediaService.js';

import noSignal from '../../assets/no_signal.png';
import ModalComponent from './ModalComponent.vue';
import ArtistItemComponent from '../ArtistItemComponent.vue';

onMounted(async () => {
  await getArtists();
});

const { loadingWrapper } = inject('track');
const { setArtistValues, onCloseArtistsListModalClick } = inject('upload');

const artists = ref([]);
const copyOfArtists = ref([]);
const artist = ref(null);
const isInEditMode = ref(false);
const thumbnailSrc = ref(noSignal);
const isProcessingData = ref(false);
const isSearching = ref(false);

const fileInput = ref(null);
const fullNameInput = ref('');
const externalLinkInput = ref('');
const descriptionInput = ref('');
const searchInput = ref('');

const emit = defineEmits(['close-modal-top-level']);

const maxUploadSize = computed(() => {
  return Math.floor(maxFileSize / oneMegaByte);
});

const clearInputs = () => {
  fileInput.value = null;
  fullNameInput.value = '';
  externalLinkInput.value = '';
  descriptionInput.value = '';

  URL.revokeObjectURL(thumbnailSrc.value);
  thumbnailSrc.value = noSignal;
}

const getArtists = async () => {
  const response = await loadingWrapper(ArtistService.GetArtists(), isSearching);
  artists.value = response;
  copyOfArtists.value = response;
};

const onFileChange = (e) => {
  fileInput.value = e.target.files[0];
  if (!!fileInput.value) {
    URL.revokeObjectURL(thumbnailSrc.value);
    thumbnailSrc.value = URL.createObjectURL(fileInput.value);
  }
  else {
    thumbnailSrc.value = noSignal;
  }
};

const onSelectArtist = (value) => {
  if (isProcessingData.value) {
    alert(`One or more processes are currently running, please wait.`);
    return;
  }

  setArtistValues(value);
  onCloseArtistsListModalClick(false);
};

const onEditInfo = (value) => {
  artist.value = value;
  fullNameInput.value = artist.value.artistName;
  externalLinkInput.value = artist.value.mainSiteAddress;
  descriptionInput.value = artist.value.description;
  if (!!artist.value.avatar) {
    thumbnailSrc.value = MediaService.GetMediaStream(artist.value.avatar, artistContainerName, mimeImgAny);
  }

  isInEditMode.value = true;
};

const onSumbit = async () => {
  let canSubmit = !!fullNameInput.value && !!fileInput.value;
  if (fullNameInput.value.length < minNameLength || fullNameInput.value > maxDisplayNameLength) {
    alert(`Name must be within ${ minNameLength } - ${ maxDisplayNameLength } characters.`)
    canSubmit = false;
  }
  if (!canSubmit) {
    alert(`Must include a profile picture.`);
    return;
  }
  if (fileInput.value.size > maxFileSize) {
    console.log(fileInput.value.size);
    alert(`File size must not exceed ${ maxUploadSize.value }MB.`);
    return;
  }


  let response = await ArtistService.GetArtistByName(fullNameInput.value);
  if (response.statusCode === Status.Ok) {
    alert(`Artist already exists.`);
    return;
  }

  isProcessingData.value = true;

  const userId = await GetCredentials();

  let payload = {
    memberId: userId,
    containerName: artistContainerName,
    file: fileInput.value,
  };
  response = await MediaService.UploadMedia(payload);
  const avatarFilePath = response.objects[0];

  payload = {
    artistName: fullNameInput.value,
    description: descriptionInput.value,
    avatar: avatarFilePath,
    mainSiteAddress: externalLinkInput.value,
  };
  response = await ArtistService.AddArtist(payload);
  response.statusCode === Status.Created && await getArtists();

  isProcessingData.value = false;
  clearInputs();

  alert(response.message);
};

const onSaveChanges = async () => {
  let canSubmit = !!fullNameInput.value;
  if (fullNameInput.value.length < minNameLength || fullNameInput.value > maxDisplayNameLength) {
    alert(`Name must be within ${ minNameLength } - ${ maxDisplayNameLength } characters.`)
    canSubmit = false;
  }
  if (!canSubmit) {
    return;
  }

  isProcessingData.value = true;

  const userId = await GetCredentials();

  let payload = {};
  let response;
  let avatarFilePath = '';

  if (!!fileInput.value) {
    if (fileInput.value.size <= maxFileSize) {
      if (!!artist.value.avatar) {
        payload = {
          url: artist.value.avatar,
          containerName: artistContainerName,
        };
        await MediaService.DeleteMedia(payload);
      }
      payload = {
        memberId: userId,
        containerName: artistContainerName,
        file: fileInput.value,
      };
      response = await MediaService.UploadMedia(payload);
      avatarFilePath = response.objects[0];
    }
    else {
      alert(`File size must not exceed ${ maxUploadSize.value }MB.`);
    }
  }

  payload = {
    artistinfoId: artist.value.artistinfoId,
    artistName: fullNameInput.value,
    description: descriptionInput.value,
    avatar: !!avatarFilePath ? avatarFilePath : artist.value.avatar,
    mainSiteAddress: externalLinkInput.value,
  };
  response = await ArtistService.UpdateArtist(payload);
  response.statusCode === Status.Ok && await getArtists();

  isProcessingData.value = false;
  clearInputs();

  alert(response.message);
};

const onDiscard = () => {
  clearInputs();
  isInEditMode.value = false;
};

const onSearchArtists = () => {
  if (!!searchInput.value) {
    artists.value = SearchArtists(copyOfArtists.value, searchInput.value.trim());
    artists.value = artists.value.length !== 0 ? artists.value : copyOfArtists.value;
  }
  else {
    artists.value = copyOfArtists.value;
  }
};

const onModalClose = (value) => {
  if (isProcessingData.value) {
    alert(`One or more processes are currently running, please wait.`);
    return;
  }
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.thumbnail {
  margin: 4px;
  object-fit: contain;
  border-radius: 10px;
  background-color: black;
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

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: white;
}

.empty-list-label {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}
</style>