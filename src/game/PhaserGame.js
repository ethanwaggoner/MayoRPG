import Phaser from 'phaser';
import { GameScene } from '/src/game/scenes/GameScene';

export function createGame(container, heroes, onGameOver, selectedSpeed, continueAfterFighting) {
  const config = {
    type: Phaser.AUTO,
    parent: container,
    width: 1200,
    height: 600,
    scene: GameScene,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    }
  };

  const game = new Phaser.Game(config);

  game.scene.start('GameScene', {
    heroes: heroes,
    onGameOver: onGameOver,
    selectedSpeed: selectedSpeed,
    continueAfterFighting: continueAfterFighting
  });

  game.setGameSpeed = (speed) => {
    const scene = game.scene.getScene('GameScene');
    if (scene) {
      scene.setGameSpeed(speed);
    }
  };

  game.setContinueAfterFighting = (value) => {
    const scene = game.scene.getScene('GameScene');
    if (scene) {
      scene.setContinueAfterFighting(value);
    }
  };

  return game;
}