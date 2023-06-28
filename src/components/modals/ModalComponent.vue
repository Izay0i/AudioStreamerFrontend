<template>
  <div class="modal-body">
    <div style="display: flex; width: 100%; align-items: center;">
      <span class="grey-block" @click="onCloseModal">-</span>
      <span class="header">{{ modalProps.title }}</span>
    </div>

    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const emit = defineEmits(['close-modal']);

const modalProps = defineProps({
  title: {
    type: String,
    default: () => `You're not supposed to be here`,
  },
  width: {
    type: Number,
    default: 75,
  },
  height: {
    type: Number,
    default: 75,
  },
  zIndex: {
    type: Number,
    default: 0,
  },
});

const onCloseModal = () => {
  emit('close-modal', false);
};

const modalDimension = computed(() => {
  return {
    width: `${ modalProps.width }vw`,
    height: `${ modalProps.height }vh`,
  };
});
</script>

<style scoped>
.modal-body {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: calc(v-bind('modalDimension.width') - (100vw - 100%));
  height: calc(v-bind('modalDimension.height') - (100vh - 100%));
  border-style: ridge;
  border-width: 6px;
  border-color: grey;
  background-color: lightgray;
  box-shadow: 12px 20px rgba(0, 0, 0, 0.72);
  z-index: v-bind('modalProps.zIndex');
}

.grey-block {
  cursor: pointer;
  padding: 4px;
  border-style: outset;
  border-width: 3px;
  background-color: lightgray;
}

.grey-block:hover {
  border-style: inset;
  background-color: gray;
}

.header {
  flex: 1;
  text-align: center;
  padding: 4px;
  color: yellow;
  border-style: solid;
  border-width: 3px;
  border-color: blue;
  background-color: blue;
}

.contents {
  overflow: auto;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: stretch;
}

.contents:deep(.section) {
  flex: 1;
  border-left-style: solid;
  border-color: grey;
  border-left-width: 2px;
  background-color: lightgray;
}
</style>