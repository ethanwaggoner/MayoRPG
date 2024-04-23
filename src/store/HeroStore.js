import { defineStore } from "pinia";
import { NewHeroStats } from "@/data/NewHeroStats.js";
import { Hero } from "@/game/hero.js";

export const useHeroStore = defineStore('heroStore', {
    state: () => ({
        heroes: NewHeroStats,
        hero1: Hero.deserialize(localStorage.getItem('hero1') || 'null'),
        hero2: Hero.deserialize(localStorage.getItem('hero2') || 'null'),
        hero3: Hero.deserialize(localStorage.getItem('hero3') || 'null'),
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
                this.hero1 = new Hero(heroData);
                this.saveHeroData('hero1', this.hero1);
            } else if (!this.hero2) {
                this.hero2 = new Hero(heroData);
                this.saveHeroData('hero2', this.hero2);
            } else if (!this.hero3) {
                this.hero3 = new Hero(heroData);
                this.saveHeroData('hero3', this.hero3);
            } else {
                console.log('All hero slots are filled');
            }
        },
        saveHeroData(heroKey, heroData) {
            localStorage.setItem(heroKey, heroData.serialize());
        },
        loadHeroData() {
            this.hero1 = Hero.deserialize(localStorage.getItem('hero1'));
            this.hero2 = Hero.deserialize(localStorage.getItem('hero2'));
            this.hero3 = Hero.deserialize(localStorage.getItem('hero3'));
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
