<script setup>

</script>

<template>
  <div class="inventory-container">
    <h2 class="inventory-title">Inventory</h2>
    <div class="grid">
      <div v-for="item in 48" :key="item" class="grid-item"></div>
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.inventory-title {
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  width: 800px;
  height: 250px;
}

.grid-item {
  background: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>