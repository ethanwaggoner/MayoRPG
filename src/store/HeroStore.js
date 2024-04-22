import { defineStore } from "pinia";
import { NewHeroStats } from "@/data/NewHeroStats.js";

export const useHeroStore = defineStore('heroStore', {
    state: () => {
        const initialState = {
            heroes: NewHeroStats,
            selectedHero: null,
        };

        const heroData = localStorage.getItem('selectedHero');
        if (heroData) {
            initialState.selectedHero = JSON.parse(heroData);
        }

        return initialState;
    },
    getters: {
        heroById: (state) => (id) => {
            return state.heroes.find(hero => hero.name === id);
        }
    },
    actions: {
        selectHero(heroName) {
            this.selectedHero = this.heroes.find(hero => hero.name === heroName);
            this.saveHeroData();
        },
        saveHeroData() {
            localStorage.setItem('selectedHero', JSON.stringify(this.selectedHero));
        },
        loadHeroData() {
            const heroData = localStorage.getItem('selectedHero');
            if (heroData) {
                this.selectedHero = JSON.parse(heroData);
            }
        }
    }
});
