<script setup>
import Logo from "@/components/Logo.vue";
</script>

<template>
  <div class="row">
    <div class="col-1">
      <Logo />
    </div>
    <div class="col-9">
      <transition name="fade-slide">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<style scoped>

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
@font-face {
  font-family: 'Almendra';
  src: url('https://fonts.googleapis.com/css2?family=Almendra&display=swap');
}

</style>