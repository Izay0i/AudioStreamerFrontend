<template>
  <ModalComponent :width="50" :height="50" title="about.txt" @close-modal="onModalClose">
    <div class="section">
      <textarea readonly class="text-area">Disclaimer: This website is used for educational purposes only.
      </textarea>
      <img :src="logo" loading="lazy" alt="banner" class="logo" />
    </div>
  </ModalComponent>
</template>

<script setup>
import logo from '../../assets/wordart.png';

import ModalComponent from './ModalComponent.vue';

const emit = defineEmits(['close-modal-top-level']);

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.text-area {
  margin: 4px;
  padding: 0;
  flex: 1; 
  resize: none; 
  white-space: pre-line; 
  background-color: lightgray; 
  border-style: none; 
  font-size: 19px;
}

.logo {
  flex: 1;
  max-width: 100%;
  height: 10%;
  object-fit: contain;
  margin: 0 4px 10px 4px;
  border-style: inset;
  border-width: 8px;
  background-color: black;
}
</style>