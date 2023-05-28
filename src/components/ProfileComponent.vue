<template>
  <div class="profile">
    <img src="../assets/backgrounds/abstract.jpg"/>
    <button>Info</button>
  </div>
            
  <div class="idk">
    <span>Your name</span>
    <span>Tracks</span>
    <span>Following</span>
  </div>

  <button>Log out</button>
</template>

<script setup>

</script>

<style scoped>
img {
  flex-shrink: 0;
  flex-grow: 1;
  max-width: 64px;
  max-height: 64px;
  object-fit: fill;
  border-style: dashed;
  border-width: 1px;
}

span {
  padding: 4px;
  border-style: solid;
  border-width: 1px;
}

button {
  padding: 4px;
  border-style: solid;
  border-width: 2px;
}

.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.idk {
  display: flex;
  flex-direction: column;
}

.idk > * {
  flex: 1;
}
</style>