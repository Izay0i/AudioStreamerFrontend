<template>
  <ModalComponent title="Profile" @close-modal="onModalClose">
    <div class="section">
      <div class="avatar-section">
        <img :src="userAvatar" loading="lazy" alt="user's avatar" class="avatar">
        <form style="margin-top: 4px;" v-if="isMainUser">
          <input type="file" accept=".webp, .jpeg, .jpg, .png, .gif" @change="onFileChange">
        </form>

        <form class="form" @submit.prevent>
          <span>Joined: {{ localeDate }}</span>

          <template v-if="isMainUser">
            <label for="email">Email:</label>
            <input id="email" type="email" placeholder="Email" readonly :disabled="isMainUser" v-model="userData.email">
          </template>

          <label for="name">Name:</label>
          <input id="name" type="text" placeholder="Display name" :readonly="!isMainUser" v-model="userData.displayName">
          
          <template v-if="isMainUser">
            <label for="currpass">Current password:</label>
            <input id="currpass" type="password" placeholder="Current password" v-model="currentPassInput">
            <label for="newpass">New password:</label>
            <input id="newpass" type="password" placeholder="New password" v-model="newPassInput">
            <label for="repass">Confirm new password:</label>
            <input id="repass" type="password" placeholder="Retype new password" v-model="renewPassInput">

            <button @click="onSaveCredentials">Save changes</button>
          </template>
          <template v-else>
            <button v-if="isFollowing" @click.once="onUnfollowUser">Unfollow</button>
            <button v-else @click.once="onFollowUser">Follow</button>
          </template>
        </form>
      </div>
    </div>

    <div class="section" style="overflow-y: auto;">
      <!-- Boy oh boy if only there was a way to export and reuse a piece of code instead of having to retype the same thing over and over again -->
      <!-- Maybe had I had more time, I wouldn't have had to resort to such tactics  -->
      <!-- Blaming on the misfortune of your birth again I see -->
      <!-- Shut up Char -->
      <div style="display: flex; position: sticky; top: 0;">
        <input type="text" class="search-input" placeholder="Search tracks" @keydown.enter="">
        <button @click="">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
      <TrackItemComponent 
      v-for="(track, index) in userTracks" 
      :key="index" 
      :data="track" 
      @play="onTrackClick" 
      @show-playlists="onPlaylistModalClick(track.trackId)" />
    </div>

    <div class="section">
      <div class="info-section">
        <textarea :readonly="!isMainUser" class="info" v-model="userData.biography"></textarea>
        <button style="margin-top: 4px;" v-if="isMainUser" @click="onSaveBiography">Save changes</button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import { computed } from '@vue/reactivity';
import { maxDisplayNameLength, minNameLength, minPasswordLength } from '../../constants/NumericConstants.js';
import { GetCredentials } from '../../functions/StorageHelper.js';
import CredentialsService from '../../services/CredentialsService.js';
import MemberService from '../../services/MemberSevice.js';
import FollowerService from '../../services/FollowerService.js';
import MediaService from '../../services/MediaService.js';
import TrackService from '../../services/TrackService.js';
import Member from '../../objects/Member.js';
import noSignal from '../../assets/no_signal.png';
import ModalComponent from './ModalComponent.vue';
import TrackItemComponent from '../TrackItemComponent.vue';

onMounted(async () => {
  mainUserId.value = await GetCredentials();
  //!!n : n != 0 > true, n = 0 > false
  isMainUser.value = !!mainUserId.value && !!props.userId ? 
    mainUserId.value === props.userId : !!mainUserId.value;

  await _getUserData();
  await _getTracks();
  await _getAvatar();
  if (!!mainUserId.value) {
    await _getFollowingList();
  }
});

const { onTrackClick, onPlaylistModalClick } = inject('track');

const mainUserId = ref(0);
const isMainUser = ref(false);
const isFollowing = ref(false);
const userData = ref(new Member());
const userAvatar = ref(noSignal);
const userTracks = ref([]);
const userFollowingList = ref([]);

//inputs
const imageFileInput = ref(null);
const currentPassInput = ref('');
const newPassInput = ref('');
const renewPassInput = ref('');

const emit = defineEmits(['close-modal-top-level']);

const props = defineProps({
  userId: {
    type: Number,
    default: 0,
  }
});

const localeDate = computed(() => {
  return new Date(userData.value.dateCreated + 'Z').toLocaleString();
});

const _handleResponse = async (response) => {
  if (response.statusCode === 200) {
    await _getFollowingList();
  }
};

const _getUserData = async () => {
  const response = await MemberService.GetMember(isMainUser.value ? mainUserId.value : props.userId);
  userData.value = response.objects[0];
};

const _getTracks = async () => {
  userTracks.value = await TrackService.GetTracksFromUserId(userData.value.memberId);
};

//No idea why the path is encoded(?)
//So I have to reload the data to get the correct url
//wtf???
const _getAvatar = async () => {
  await _getUserData();
  const inlineImg = 'data:image/*;base64,' + btoa(noSignal);
  userAvatar.value = !!userData.value.avatar && userData.value.avatar !== '' ? 
    MediaService.GetMediaStream(userData.value.avatar, 'avatar', 'image/*') : inlineImg;
};

const _getFollowingList = async () => {
    userFollowingList.value = await FollowerService.GetFollowings(mainUserId.value);
    isFollowing.value = userFollowingList.value.some(user => user.memberId === props.userId);
};

const onFileChange = (e) => imageFileInput.value = e.target.files[0];

const onSaveCredentials = async () => {
  let payload = {};
  let response;

  let canUpdatePassword = !!currentPassInput.value && 
    !!newPassInput.value && 
    !!renewPassInput.value && 
    (newPassInput.value === renewPassInput.value);

  if (currentPassInput.value.length !== 0 && 
    newPassInput.value.length !== 0 && 
    renewPassInput.value.length !== 0) 
  {
    if (currentPassInput.value.length < minPasswordLength || 
      newPassInput.value < minPasswordLength || 
      renewPassInput.value < minPasswordLength) 
    {
      canUpdatePassword = false;
      alert(`Password length must be ${ minPasswordLength } characters at minimum.`);
    }

    if (newPassInput.value !== renewPassInput.value) {
      canUpdatePassword = false;
      alert('The password you just typed must be identical to the new one.');
    }
  }
  if (canUpdatePassword) {
    payload = {
      email: userData.value.email,
      password: currentPassInput.value,
      newPassword: newPassInput.value,
      displayName: 'string',
    };

    response = await CredentialsService.ChangePassword(payload);
    alert(response.message);
    currentPassInput.value = newPassInput.value = renewPassInput.value = '';
  }

  const displayName = userData.value.displayName;
  if (displayName.length < minNameLength || displayName.length > maxDisplayNameLength) {
    alert(`User's display name must be within ${ minNameLength } - ${ maxDisplayNameLength } characters. Update aborted.`);
    return;
  }

  let imageFilePath = userData.value.avatar;
  if (!!imageFileInput.value) {
    if (!!userData.value.avatar) {
      const imagePayload = {
        url: userData.value.avatar,
        containerName: 'avatar',
      };

      await MediaService.DeleteMedia(imagePayload);
    }

    const imagePayload = {
      memberId: mainUserId.value,
      containerName: 'avatar',
      file: imageFileInput.value,
    };

    response = await MediaService.UploadMedia(imagePayload);
    imageFilePath = response.objects[0];
  }

  payload = {
    email: userData.value.email,
    displayName,
    avatar: imageFilePath,
  };

  response = await MemberService.UpdateMember(payload);
  alert(response.message);
  await _getAvatar();
};

const onSaveBiography = async () => {
  const payload = {
    email: userData.value.email,
    biography: userData.value.biography,
  };

  const response = await MemberService.UpdateMember(payload);
  alert(response.message);
};

const onFollowUser = async () => {
  if (!(!!mainUserId.value)) {
    return;
  }

  const response = await FollowerService.FollowUser(mainUserId.value, props.userId);
  await _handleResponse(response);
};

const onUnfollowUser = async () => {
  if (!(!!mainUserId.value)) {
    return;
  }

  const response = await FollowerService.UnfollowUser(mainUserId.value, props.userId);
  await _handleResponse(response);
};

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.avatar-section {
  padding: 4px;
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  overflow-y: auto;
}

.avatar {
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  background-color: black;
}

.form {
  margin-top: 4px;
  display: flex;
  flex-direction: column;
}

.form > * {
  margin-top: 6px;
  padding: 6px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border-radius: 0;
  background-color: white;
}

.info-section {
  margin: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}
</style>