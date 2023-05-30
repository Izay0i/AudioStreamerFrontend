<template>
  <ModalComponent title="Profile" @close-modal="onModalClose">
    <div class="section">
      <div class="avatar-section">
        <img :src="avatar" class="avatar">
        <button @click="onChangeAvatar">Change avatar</button>

        <form class="form" @submit.prevent>
          <label>Name:</label>
          <input type="text" placeholder="Display name" :value="profileProps.name">
          <label>Email:</label>
          <input type="email" placeholder="Email" :value="profileProps.email">
          <label>Current password:</label>
          <input type="password" placeholder="Current password">
          <label>New password:</label>
          <input type="password" placeholder="New password">
          <label>Retype new password:</label>
          <input type="password" placeholder="Retype new password">
          <button @click="onSaveCredentials">Save changes</button>
        </form>
      </div>
    </div>

    <div class="section">
     
    </div>

    <div class="section">
      <div class="info-section">
        <textarea readonly class="info">
          {{ profileProps.info }}
        </textarea>
        <button style="margin-top: 4px;" @click="onSaveInfo">Save changes</button>
      </div>
    </div>
  </ModalComponent>
</template>

<script setup>
import noSignal from '../../assets/no_signal.png';
import ModalComponent from './ModalComponent.vue';

const emit = defineEmits(['close-modal-top-level']);

const profileProps = defineProps({
  avatar: {
    type: String,
    default: noSignal,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    default: 'No signal',
  },
});

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
const onChangeAvatar = () => {};
const onSaveCredentials = () => {};
const onSaveInfo = () => {};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
}

.avatar-section {
  margin: 4px;
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

.info-section {
  margin: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info {
  flex: 1;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}
</style>