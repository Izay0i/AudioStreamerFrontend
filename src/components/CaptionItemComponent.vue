<template>
  <div class="caption-body">
    <form class="form">
      <input 
      type="number" 
      min="0" 
      step="0.000001" 
      placeholder="timestamp" 
      v-model="props.data.timestamp" 
      :disabled="!isEditable">
      <input 
      type="number" 
      min="0" 
      step="0.000001" 
      placeholder="duration" 
      v-model="props.data.duration" 
      :disabled="!isEditable">
      <textarea placeholder="subtitle" v-model="props.data.message" :disabled="!isEditable"></textarea>
    </form>

    <div class="buttons">
      <button v-show="!isEditable" @click="() => isEditable = true">Update</button>
      <button v-show="isEditable" @click="onSaveClick">Save</button>
      <button @click="onRemoveClick">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isEditable = ref(false);

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    default: {
      timestamp: 0.0,
      duration: 0.0,
      message: 'foobar',
    }
  },
});

const onSaveClick = () => {
  if (props.data.timestamp < 0 || 
  props.data.duration < 0 || 
  props.data.message === '') 
  {
    return;
  }

  isEditable.value = false;
};

const emit = defineEmits(['remove-caption']);

const onRemoveClick = () => {
  emit('remove-caption', props.index);
};
</script>

<style scoped>
.caption-body {
  flex-shrink: 0;
  margin: 4px;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  overflow: auto;
  border-style: outset;
  border-width: 4px;
  background-color: gray;
}

.form {
  flex: 1;
  display: flex;
}

.buttons {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.buttons > button {
  flex: 1;
}

.buttons > button:nth-of-type(3) {
  background-color: darkred;
  color: white;
}
</style>