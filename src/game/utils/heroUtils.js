import { LANES } from '../gameConstants';

export function createHeroes(scene, heroes) {
  heroes.forEach((hero, index) => {
    if (index < LANES.length) {
      const sprite = scene.add.sprite(100, LANES[index], `hero${index}`).setOrigin(0.5, 0.5);
      const frames = scene.anims.generateFrameNumbers(`hero${index}`, { start: 0, end: 5 });
      scene.anims.create({
        key: `heroAnim${index}`,
        frames,
        frameRate: 10 * scene.selectedSpeed.value,
        repeat: -1
      });
      sprite.play(`heroAnim${index}`);
      hero.sprite = sprite;
      sprite.setData('instance', hero);
      createHeroAttackAnimation(scene, hero, index);
    }
  });
}

export function createHeroAttackAnimation(scene, hero, index) {
  const frameRate = 10 * scene.selectedSpeed.value;

  // Idle animation
  scene.anims.create({
    key: `heroIdle${index}`,
    frames: scene.anims.generateFrameNumbers(`hero${index}`, { start: 0, end: 5 }),
    frameRate,
    repeat: -1
  });

  // Attack animation
  let attackStartFrame, attackEndFrame;
  switch (hero.heroClass) {
    case 'Berserker':
      attackStartFrame = 12;
      attackEndFrame = 23;
      break;
    case 'Hunter':
      attackStartFrame = 24;
      attackEndFrame = 29;
      break;
    case 'Wizard':
      attackStartFrame = 30;
      attackEndFrame = 35;
      break;
    default:
      attackStartFrame = 0;
      attackEndFrame = 5;
  }

  scene.anims.create({
    key: `heroAttack${index}`,
    frames: scene.anims.generateFrameNumbers(`hero${index}`, { start: attackStartFrame, end: attackEndFrame }),
    frameRate,
    repeat: 0
  });
}

export function playHeroAttackAnimation(hero, sprite) {
  const heroIndex = hero.index;
  if (sprite && sprite.anims) {
    // If an attack animation is already playing, don't interrupt it
    if (sprite.anims.currentAnim && sprite.anims.currentAnim.key === `heroAttack${heroIndex}`) {
      return;
    }

    // Stop any current animation and play the attack animation
    sprite.stop();
    sprite.play(`heroAttack${heroIndex}`);

    // After the attack animation completes, return to idle
    sprite.once('animationcomplete', () => {
      sprite.play(`heroIdle${heroIndex}`, true);
    });
  }
}