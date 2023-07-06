<template>
  <ModalComponent :width="50" :height="50" :z-index="4" title="welcome.txt" @close-modal="onModalClose">
    <div class="section">
      <textarea readonly class="text-area">Hi there! Welcome to my website!!
        Feel free to look around.
        This is my github profile: https://github.com/Izay0i
        Check it out :)

        To get started, why don't you click on any of the folders
      </textarea>

      <details>
        <summary>Woah woah pipebomb so cool i wonder what happens if I</summary>
        <textarea>
          {{ billionsMustLaugh }}
        </textarea>
      </details>
    </div>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from './ModalComponent.vue';

const emit = defineEmits(['close-modal-top-level']);

const onModalClose = (value) => {
  emit('close-modal-top-level', value);
};

const billionsMustLaugh = `
<?xml version="1.0"?>
<!DOCTYPE lolz [
<!ENTITY lol "lol">
<!ELEMENT lolz (#PCDATA)>
<!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
<!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
<!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
<!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
<!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
<!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
<!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
<!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
<!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
`;
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