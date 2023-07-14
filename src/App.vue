<template>
  <RouterView />
</template>

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
  border-radius: 2px;
  border-style: outset;
  border-width: 3px;
  border-color: whitesmoke;
  background-color: gray;
}

::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:hover {
  background-color: darkgray;
}

audio {
  border-radius: 8px;
  border-style: groove;
  border-width: 4px;
  background-color: lightgray;
}

audio::-webkit-media-controls-panel {
  background-color: lightgray;
}

li {
  list-style: none;
  margin-left: 6px;
  font-weight: bold;
  font-size: 20px;
}

button {
  position: relative;
  padding: 6px;
  font-size: 16px;
  border-style: outset;
  border-width: 5px;
  border-radius: 4px;
  border-color: gray;
}

button:active:not(:disabled), input[type="file"]::file-selector-button:active {
  border-style: inset;
}

select {
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
}

select:focus {
  outline: none;
}

input {
  border-radius: 4px;
  border-width: 1px;
}

input[type="file"]::file-selector-button {
  padding: 6px;
  font-size: 12px;
  border-style: outset;
  border-width: 5px;
  border-radius: 4px;
  border-color: gray;
}

input:focus {
  outline: none;
}

textarea {
  outline: none;
  border-radius: 4px;
  border-width: 1px;
}

body {
  display: flex;
  min-width: 0;
  min-height: 0;
  margin: 20px;
  padding: 0;
  background-color: black;
}

body::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-image: url('./assets/backgrounds/albums.jpg');
  background-repeat: repeat;
  background-size: cover;
  background-position: center center;
  background-color: black;
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(px);
  z-index: -1;
}
</style>
