<template>
  <ModalComponent :width="50" :height="50" :z-index="5" title="Description" @close-modal="onModalClose">
    <textarea 
    readonly 
    spellcheck="false" 
    autocorrect="off" 
    autocapitalize="off" 
    class="info">{{ description }}</textarea>
  </ModalComponent>
</template>

<script setup>
import { computed } from 'vue';
import ModalComponent from './ModalComponent.vue';

const props = defineProps({
  description: {
    type: String,
    default: 'No signal',
  },
});

const emit = defineEmits(['close-modal-top-level']);

const description = computed(() => {
  if (!(!!props.description)) {
    return 'No signal';
  }
  return props.description;
});

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};
</script>

<style scoped>
.info {
  flex: 1;
  padding: 10px;
  white-space: pre-line;
  resize: none;
  font-size: 18px;
  color: greenyellow;
  background-color: black;
  border-style: double;
  border-width: 6px;
}
</style>