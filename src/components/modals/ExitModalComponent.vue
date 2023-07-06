<template>
  <ModalComponent :width="20" :height="10" :z-index="7" title="Quit current session?" @close-modal="onModalClose">
    <div class="section">
      <button @click="onExitClick">Yes</button>
      <button style="margin-left: 4px;" @click="emit('close-modal-top-level', false)">No</button>
    </div>
  </ModalComponent>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { RemoveCredentials } from '../../functions/StorageHelper.js';
import ModalComponent from './ModalComponent.vue';

const router = useRouter();

const emit = defineEmits(['close-modal-top-level']);

const onExitClick = async () => {
  await RemoveCredentials();
  router.push('credentials');
};

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