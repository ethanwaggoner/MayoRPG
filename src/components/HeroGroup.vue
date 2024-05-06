<script setup>

</script>

<template>
  <div class="hero-container">
    <h2>Hero Group</h2>
    <div class="row">
      <div v-for="index in 3" :key="index" class="hero-square">
        <span class="plus">+</span>
      </div>
    </div>
    <div class="row">
      <div v-for="index in 2" :key="index + 3" class="hero-square">
        <span class="plus">+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: white;
  font-size: 2rem;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  border: 2px solid white;
  margin-top: 1rem;
}

.row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.hero-square {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  width: 25%;
  padding-bottom: 32%;
  position: relative;
  margin: 15px;
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
}

.hero-square:hover {
  transform: scale(1.1) translateY(-10px);
}

.plus {
  margin-top: 75%;
  position: absolute;
  font-size: 4rem;
  font-weight: bold;
  color: white;
}

.hero-square:hover .plus {
  font-size: 4.5rem;
  cursor: pointer;
}
</style>
