<template>
  <div class="vignette"></div>

  <ModalComponent :width="30" :height="45" :title="defaultPath + defaultDir">
    <div class="section" style="flex: 1; overflow: hidden;">
      <ul class="folders">
        <span class="folder" v-for="(item, _) in _listItems" @click="onFolderClick(item)">
          <template v-if="item.icon === 'folder'">
            <svg v-if="item.title === 'sign_in'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <svg v-if="item.title === 'register'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
             <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
            <svg v-if="item.title === 'main'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
              <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
            </svg>
          </template>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { mainRouteName } from '../constants/RouteConstants.js';
import { fallbackPlaylistName, placeholder } from '../constants/StringConstants.js';
import { minNameLength, maxDisplayNameLength, minPasswordLength } from '../constants/NumericConstants.js';
import { Status } from '../constants/StatusConstants.js';
import { ValidateEmailAddress } from '../functions/InputHelper.js';
import { SaveCredentials } from '../functions/StorageHelper.js';

import CredentialsService from '../services/CredentialsService.js';
import PlaylistService from '../services/PlaylistService.js';
import ModalComponent from '../components/modals/ModalComponent.vue';

onMounted(() => {
  onFolderClick(_listItems[0]);
});

const defaultPath = 'credentials\\';
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
  if (!ValidateEmailAddress(emailInput.value)) {
    alert('Invalid email address.');
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
  if (!ValidateEmailAddress(emailInput.value)) {
    alert('Invalid email address.');
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
    displayName: placeholder,
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
  -webkit-filter: blur(4px);
  -moz-filter: blur(4px);
  -o-filter: blur(4px);
  -ms-filter: blur(4px);
  filter: blur(4px);
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