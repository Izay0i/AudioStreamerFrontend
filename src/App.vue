<template>
  <NeoHomeView></NeoHomeView>
</template>

<script setup>
import { onMounted } from 'vue';
import NeoHomeView from './views/NeoHomeView.vue';

// onMounted(async () => {
//   const response = await fetch('https://audiostreamer.azurewebsites.net/api/media?src=https%3A%2F%2Fstreamingmediaapistorage.blob.core.windows.net%2Fmedia%2F1_y2mate_20230519T122816992.mp3&containerName=media&contentType=audio%2Fmpeg', {
//     method: 'GET',
//     mode: 'cors',
//   });
//   console.log(await response);
// });
</script>

<style>
@font-face {
  font-family: cyberpunk;
  src: url('./assets/fonts/CyberpunkWaifus.woff');
}

* {
  font-family: cyberpunk;
}

::-webkit-scrollbar {
  width: 15px;
  background-color: black;
}

::-webkit-scrollbar-thumb {
  border-style: outset;
  border-width: 3px;
  border-color: whitesmoke;
  background-color: gray;
}

::-webkit-scrollbar-button {
  border-style: outset;
  border-width: 3px;
  border-color: whitesmoke;
  background-color: gray;
}

::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:hover {
  background-color: darkgray;
}

button {
  position: relative;
  padding: 6px;
  font-size: 16px;
  border-style: outset;
  border-width: 5px;
  border-radius: 0;
  border-color: grey;
}

button:active:not(:disabled) {
  border-style: inset;
}

textarea {
  outline: none;
}

input:focus {
  outline: none;
}

body {
  display: flex;
  min-width: 0;
  min-height: 0;
  margin: 20px;
  padding: 0;
  background-image: url('./assets/backgrounds/chess.png');
  background-repeat: repeat;
  background-size: auto;
  background-position: center center;
  background-color: black;
}
</style>
