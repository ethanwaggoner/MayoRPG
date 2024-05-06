import { defineStore } from "pinia";

export const useCharacterStore = defineStore('characterStore', {
    state: () => ({
        level: 1,
        currentExperience: 75,
        requiredExperience: 100,
    }),
    getters: {
        experiencePercentage(state) {
            return (state.currentExperience / state.requiredExperience) * 100;
        }
    },
    actions: {
        gainExperience(amount) {
            this.currentExperience += amount;
            if (this.currentExperience >= this.requiredExperience) {
                this.levelUp();
            }
        },
        levelUp() {
            this.level++;
            this.currentExperience -= this.requiredExperience;
            this.requiredExperience = Math.floor(this.requiredExperience * 1.1);
        }
    }

});