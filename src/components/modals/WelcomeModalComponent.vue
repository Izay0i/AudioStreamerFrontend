<template>
  <ModalComponent :width="50" :height="17" title="welcome.txt" @close-modal="onModalClose">
    <div class="section">
      <textarea readonly class="text-area">
        Hi there! Welcome to my website!!
        Feel free to look around.
        This is my github profile: https://github.com/Izay0i
        Check it out :)
      </textarea>
    </div>
  </ModalComponent>
</template>

<script setup>
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
</style>