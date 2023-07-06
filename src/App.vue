<template>
  <RouterView />
</template>

<script setup>
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

audio {
  background-color: lightgray;
  border-style: groove;
  border-width: 4px;
}

audio::-webkit-media-controls-panel {
  background-color: lightgray;
}

li {
  list-style: none;
  margin-left: 6px;
  font-weight: bold;
  font-size: 18px;
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

button:active:not(:disabled), input[type="file"]::file-selector-button:active {
  border-style: inset;
}

select {
  border-radius: 0;
}

select:focus {
  outline: none;
}

input {
  border-radius: 0;
  border-width: 1px;
}

input[type="file"]::file-selector-button {
  padding: 6px;
  font-size: 12px;
  border-style: outset;
  border-width: 5px;
  border-radius: 0;
  border-color: grey;
}

input:focus {
  outline: none;
}

textarea {
  outline: none;
  border-radius: 0;
  border-width: 1px;
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
