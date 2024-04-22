import { defineStore } from "pinia";
import { NewHeroStats } from "@/data/NewHeroStats.js";

export const useHeroStore = defineStore('heroStore', {
    state: () => ({
        heroes: NewHeroStats,
        hero1: JSON.parse(localStorage.getItem('hero1') || 'null'),
        hero2: JSON.parse(localStorage.getItem('hero2') || 'null'),
        hero3: JSON.parse(localStorage.getItem('hero3') || 'null'),
    }),
    getters: {
        heroById: (state) => (id) => {
            return state.heroes.find(hero => hero.name === id);
        }
    },
    actions: {
        selectHero(heroName) {
            const heroData = this.heroes.find(hero => hero.name === heroName);
            if (!this.hero1) {
                this.hero1 = heroData;
                this.saveHeroData('hero1', this.hero1);
            } else if (!this.hero2) {
                this.hero2 = heroData;
                this.saveHeroData('hero2', this.hero2);
            } else if (!this.hero3) {
                this.hero3 = heroData;
                this.saveHeroData('hero3', this.hero3);
            } else {
                console.log('All hero slots are filled');
            }
        },
        saveHeroData(heroKey, heroData) {
            localStorage.setItem(heroKey, JSON.stringify(heroData));
        },
        loadHeroData() {
            this.hero1 = JSON.parse(localStorage.getItem('hero1') || 'null');
            this.hero2 = JSON.parse(localStorage.getItem('hero2') || 'null');
            this.hero3 = JSON.parse(localStorage.getItem('hero3') || 'null');
        },
        clearHeroData() {
            localStorage.removeItem('hero1');
            localStorage.removeItem('hero2');
            localStorage.removeItem('hero3');
            this.hero1 = null;
            this.hero2 = null;
            this.hero3 = null;
        },

    }
});
