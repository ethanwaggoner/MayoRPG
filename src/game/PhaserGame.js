import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import { GAME_WIDTH, GAME_HEIGHT } from './gameConstants';

export function createGame(container, heroes, emit, selectedSpeed, continueAfterFighting) {
  const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: container,
    physics: {
      default: 'arcade',
      arcade: { debug: false }
    },
    scene: [GameScene]
  };

  const game = new Phaser.Game(config);
  game.scene.start('GameScene', { heroes, emit, selectedSpeed, continueAfterFighting });

  return game;
}