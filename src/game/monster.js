class Monster extends Character {
    constructor(name, attributes, aggressionLevel = 1) {
        super(name, attributes);
        this.aggressionLevel = aggressionLevel;
    }

    attack(target, type) {
        const aggressionMultiplier = 1 + 0.1 * this.aggressionLevel;
        const baseAttack = this.attacks[type];
        const defenseType = Object.keys(target.defenses).reduce((acc, key) => {
            return target.defenses[key] > target.defenses[acc] ? key : acc;
        }, 'fire');
        const defenseReduction = target.defenses[defenseType] || 0;
        let damage = (baseAttack - defenseReduction) * this.getTypeEffectiveness(type, defenseType) * aggressionMultiplier;

        if (Math.random() < this.crit_chance) {
            damage *= this.crit_damage;
            console.log(`${this.name} (aggressively) lands a critical hit on ${target.name}!`);
        }

        damage = Math.max(0, damage);

        target.takeDamage(damage);
        console.log(`${this.name} (aggressively) attacks ${target.name} with ${type} attack, dealing ${damage} damage.`);
    }
}
