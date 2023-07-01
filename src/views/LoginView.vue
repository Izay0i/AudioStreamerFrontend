<template>
  <div class="vignette">
    <img src="../assets/backgrounds/background.gif" class="background" alt="escalator">
  </div>

  <audio preload="auto" autoplay loop :src="BGSong"></audio>

  <ModalComponent :width="30" :height="45" :title="defaultPath + defaultDir">
    <div class="section" style="flex: 1; overflow: hidden;">
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
    </div>
    <div class="section" style="flex: 2;">
      <form class="form">
        <label for="email">Email:</label>
        <input id="email" type="email" placeholder="user@example.com" v-model="emailInput">
        <label for="pass">Password:</label>
        <input id="pass" type="password" placeholder="Password" v-model="passwordInput">
        
        <template v-if="isRegisterMode">
          <label for="repass">Confirm password:</label>
          <input id="repass" type="password" placeholder="Confirm your password by retyping it" v-model="repassInput">
          <label for="name">Name:</label>
          <input id="name" type="text" placeholder="Display name" v-model="nameInput">
          <button @click.prevent="onSignUpClick">Sign Up</button>
        </template>

        <button @click.prevent="onSignInClick" v-else>Sign In</button>
      </form>
    </div>
  </ModalComponent>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { mainRouteName } from '../constants/RouteConstants.js';
import { fallbackPlaylistName } from '../constants/StringConstants.js';
import { minNameLength, maxDisplayNameLength, minPasswordLength } from '../constants/NumericConstants.js';
import { SaveCredentials } from '../functions/StorageHelper.js';

import { Status } from '../constants/StatusConstants.js';

import BGSong from '../assets/music/background_music.mp3';
import CredentialsService from '../services/CredentialsService.js';
import PlaylistService from '../services/PlaylistService.js';
import ModalComponent from '../components/modals/ModalComponent.vue';

const defaultPath = 'C:\\files\\projects\\audio_streamer\\';
const defaultDir = ref('*.*');
const isRegisterMode = ref(false);

//inputs
const emailInput = ref('');
const passwordInput = ref('');
const repassInput = ref('');
const nameInput = ref('');

const router = useRouter();

const _listItems = [
  { title: 'sign_in', icon: 'folder', func: () => {} }, 
  { title: 'register', icon: 'folder', func: () => {} }, 
  { title: 'main', icon: 'folder', func: () => router.push(mainRouteName) }, 
];

const _handleResponse = async (response) => {
  if (response.statusCode === Status.Ok || response.statusCode === Status.Created) {
    await SaveCredentials(response.objects[0]);
    router.push(mainRouteName);
  }
  else {
    alert(response.message);
  }
};

const onFolderClick = (item) => {
  isRegisterMode.value = item.title === 'register';
  defaultDir.value = item.icon === 'folder' ? item.title : '*.*';
  item.func();
};

const onSignUpClick = async () => {
  if (emailInput.value.length === 0 || 
    passwordInput.value.length === 0 || 
    repassInput.value.length === 0 || 
    nameInput.value.length === 0) 
  {
    alert('Credentials fields must not be empty.');
    return;
  }
  if (passwordInput.value.length < minPasswordLength || repassInput.value.length < minPasswordLength) {
    alert(`Password must be ${ minPasswordLength } characters at minimum.`);
    return;
  }
  if (passwordInput.value !== repassInput.value) {
    alert(`Mismatch values in password fields.`);
    return;
  }
  if (nameInput.value.length < minNameLength || nameInput.value.length > maxDisplayNameLength) {
    alert(`Name must be within ${ minNameLength } - ${ maxDisplayNameLength } characters.`);
    return;
  }

  const payload = {
    email: emailInput.value,
    password: passwordInput.value,
    newPassword: repassInput.value,
    displayName: nameInput.value,
  };

  let response = await CredentialsService.SignUp(payload);

  //It's god awful
  if (response.statusCode === Status.Created) {
    const userId = response.objects[0];
    const payload = {
      memberId: userId,
      name: fallbackPlaylistName,
    };
    await PlaylistService.AddPlaylist(payload);
  }

  await _handleResponse(response);
};

const onSignInClick = async () => {
  if (emailInput.value.length === 0 || passwordInput.value.length === 0) {
    alert('Credentials fields must not be empty.');
    return;
  }
  if (passwordInput.value.length < minPasswordLength) {
    alert(`Password must be ${ minPasswordLength } characters at minimum.`);
    return;
  }

  //This is also god awful
  const payload = {
    email: emailInput.value,
    password: passwordInput.value,
    displayName: 'string',
  };

  const response = await CredentialsService.SignIn(payload);
  await _handleResponse(response);
};
</script>

<style scoped>
.vignette::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 1);
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.form {
  margin: 4px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
}

.form > * {
  margin-bottom: 4px;
  padding: 6px;
}
</style>