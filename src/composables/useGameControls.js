import { ref } from 'vue';

export default function useGameControls() {
  const selectedSpeed = ref(1);
  const continueAfterFighting = ref(true);

  function changeSpeed(game, newSpeed) {
    selectedSpeed.value = newSpeed;
    if (game && game.scene.scenes[0]) {
      const scene = game.scene.scenes[0];
      scene.setSpeed(newSpeed);
    }
  }

  return {
    selectedSpeed,
    continueAfterFighting,
    changeSpeed
  };
}