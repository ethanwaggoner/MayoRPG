<script setup>

</script>

<template>
  <div class="inventory-container">
    <div class="grid">
      <div v-for="item in 48" :key="item" class="grid-item"></div>
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  grid-gap: 5px;
  width: 100%;
  height: auto;
}

.grid-item {
  background: linear-gradient(145deg, #6e7075, #8a8c90);
  border: 2px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.grid-item:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
}
</style>
