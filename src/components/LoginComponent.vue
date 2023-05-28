<template>
  <div class="body">
    <p class="banner wavy">Welcome!</p>
    
    <div class="main">
      <form class="form" @submit.prevent="clickTest">
        <label class="form-text">Email:</label>
        <input type="email" value="example@mail.com" class="input">
        <label class="form-text">Password:</label>
        <input type="password" value="lolsorandom" class="input">
        <button class="input button">Sign In</button>
      </form>

      <form class="form" @submit.prevent="clickTest">
        <label class="form-text">Email:</label>
        <input type="email" value="example@mail.com" class="input">
        <label class="form-text">Password:</label>
        <input type="password" value="lolsorandom" class="input">
        <label class="form-text">Confirm password:</label>
        <input type="password" value="lolsorandom" class="input">
        <label class="form-text">Name:</label>
        <input value="lolsorandom" class="input">
        <button class="input button">Sign Up</button>
      </form>
    </div>
    
    <button class="navigate input button" @click="clickTest">Navigate to /main</button>
  </div>
</template>

<script setup>
function clickTest() {
  alert("Lol hi!");
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wavy {
  position: relative;
  top: 0;
  left: 0;
  animation: wavy 1.3s ease infinite;
}

@keyframes wavy {
  0% {
    top: 0px;
  }
  50% {
    top: -15px;
  }
  100% {
    top: 0px;
  }
}

.banner {
  position: relative;
  margin-top: 12rem;
  font-size: 6em;
  font-style: italic;
  font-weight: bold;
  background: linear-gradient(to right, blue, magenta);
  box-shadow: 10px 10px rgba(0, 0, 0, 0.8);
  transform: skew(-16deg);
  color: white;
  text-shadow: 10px 10px rgba(0, 0, 0, 0.5), 15px 15px rgba(0, 0, 0, 1);
}

.main {
  display: flex;
  justify-content: space-evenly;
}

.form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 20px;
  background-color: grey;
  box-shadow: 8px 10px rgba(0, 0, 0, 0.72);
  border-style: double;
  border-width: 6px;
}

.form > * {
  margin: 3px;
  padding: 4px;
}

.form-text {
  color: white;
  
}

.navigate {
  position: relative;
  box-shadow: 8px 10px rgba(0, 0, 0, 0.72);
}

.button {
  padding: 4px;
  border-style: ridge;
  border-width: 3px;
}

.input {
  border-radius: 0%;
  outline-width: 0;
}
</style>