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
  let startFrame, endFrame;
  switch (hero.heroClass) {
    case 'Berserker':
      startFrame = 12;
      endFrame = 23;
      break;
    case 'Hunter':
      startFrame = 24;
      endFrame = 29;
      break;
    case 'Wizard':
      startFrame = 30;
      endFrame = 35;
      break;
  }
  const attackFrames = scene.anims.generateFrameNumbers(`hero${index}`, { start: startFrame, end: endFrame });
  scene.anims.create({
    key: `heroAttack${index}`,
    frames: attackFrames,
    frameRate: 10 * scene.selectedSpeed.value,
    repeat: -1
  });
}

export function playHeroAttackAnimation(hero, sprite) {
  const heroIndex = hero.index;
  if (sprite?.anims?.currentAnim?.key !== `heroAttack${heroIndex}`) {
    sprite?.play(`heroAttack${heroIndex}`);
  }
}