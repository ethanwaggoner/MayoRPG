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
  background: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
