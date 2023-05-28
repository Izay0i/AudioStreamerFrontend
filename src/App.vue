<template>
  <NeoHomeView></NeoHomeView>
</template>

<script setup>
  import NeoHomeView from './views/NeoHomeView.vue';
</script>

<style>
@font-face {
  font-family: cyberpunk;
  src: url('./assets/fonts/CyberpunkWaifus.woff');
}

* {
  font-family: cyberpunk;
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
