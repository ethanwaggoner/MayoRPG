import { ref } from 'vue';

export default function useGameControls() {
  const selectedSpeed = ref(1);
  const continueAfterFighting = ref(true);

  function changeSpeed(game, newSpeed) {
    selectedSpeed.value = newSpeed;
    if (game) {
      game.setGameSpeed(newSpeed);
    }
  }

  function changeContinueAfterFighting(game, value) {
    continueAfterFighting.value = value;
    if (game) {
      game.setContinueAfterFighting(value);
    }
  }

  return {
    selectedSpeed,
    continueAfterFighting,
    changeSpeed,
    changeContinueAfterFighting
  };
}