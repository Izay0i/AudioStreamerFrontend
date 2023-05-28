<template>
  <!-- <audio loop autoplay>
    <source src="../assets/music/background_music.mp3">
  </audio> -->
  <div class="vignette">
    <img src="../assets/backgrounds/background.gif" class="background" alt="escalator">
  </div>

  <slot ></slot>  
</template>

<script setup>

</script>

<style scoped>
.vignette::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 1);
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>