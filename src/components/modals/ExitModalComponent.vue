<template>
  <ModalComponent :width="20" :height="10" title="Quit current session?" @close-modal="onModalClose">
    <div class="section">
      <button @click="">Yes</button>
      <button style="margin-left: 4px;" @click="emit('close-modal-top-level', false)">No</button>
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
  margin: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.section > * {
  flex: 1;
}
</style>