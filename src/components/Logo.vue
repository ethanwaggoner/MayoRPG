<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo-no-background.png';
</script>

<template>
  <div class="logo-container">
    <router-link to="/">
      <img class="logo" :src="logo" alt="Logo" />
    </router-link>
  </div>
</template>

<style scoped>
.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.logo {
  width: 100px;
  height: auto;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
}
</style>