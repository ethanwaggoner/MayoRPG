import { LANES, MONSTERS_PER_LEVEL_INCREASE } from '../gameConstants';

export function displayDamage(scene, sprite, damage, color = '#ff0000') {
  const damageText = scene.add.text(sprite.x, sprite.y - 50, damage, {
    fontSize: '32px',
    fill: color
  });
  scene.tweens.add({
    targets: damageText,
    y: sprite.y - 100,
    alpha: 0,
    duration: 1000 / scene.selectedSpeed.value,
    ease: 'Power1',
    onComplete: () => damageText.destroy()
  });
}

export function findClosestHero(monsterSprite, heroes) {
  let closestHero = null;
  let minDistance = Infinity;
  heroes.forEach((hero, index) => {
    if (hero.health > 0) {
      const heroPosition = { x: 100, y: LANES[index], hero, sprite: hero.sprite };
      const distance = Phaser.Math.Distance.Between(monsterSprite.x, monsterSprite.y, heroPosition.x, heroPosition.y);
      if (distance < minDistance) {
        minDistance = distance;
        closestHero = heroPosition;
      }
    }
  });
  return closestHero;
}

export function handleCollision(monsterSprite, heroSprite) {
  const monster = monsterSprite.getData('instance');
  const hero = heroSprite.getData('instance');
  monsterSprite.setVelocity(0);
  if (monsterSprite.anims.currentAnim?.key !== `monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`) {
    monsterSprite.play(`monsterAttack${monsterSprite.data.get('element')}${monsterSprite.data.get('index')}`);
  }
  if (monster.canAttack()) {
    const damage = monster.calculateDamage();
    hero.takeDamage(damage);
    displayDamage(this, hero.sprite, damage, '#ff0000');
    if (hero.health <= 0) {
      if (this.continueAfterFighting.value) {
        this.emit('restartGame');
      } else {
        this.emit('gameOver');
      }
    }
  }
}

export function monsterKilled(scene) {
  scene.monstersKilled++;
  if (scene.monstersKilled >= scene.monstersPerLevel) {
    scene.currentLevel++;
    scene.monstersKilled = 0;
    scene.monstersPerLevel += MONSTERS_PER_LEVEL_INCREASE;
    scene.maxMonsters += MONSTERS_PER_LEVEL_INCREASE;
  }
  updateLevelText(scene);
}

export function updateLevelText(scene) {
  if (scene.levelText && scene.nextLevelText) {
    scene.levelText.setText(`Level: ${scene.currentLevel}`);
    scene.nextLevelText.setText(`Monsters to Next Level: ${scene.monstersPerLevel - scene.monstersKilled}`);
  }
}