import { defineStore } from "pinia";
import { NewHeroStats } from "@/data/NewHeroStats.js";
import { Hero } from "@/game/hero.js";

export const useHeroStore = defineStore('heroStore', {
    state: () => ({
        heroes: NewHeroStats,
        selectedHero: null,  // Temporary storage for a hero being reviewed or customized
        HeroGroup1: JSON.parse(localStorage.getItem('HeroGroup1') || '[]').map(Hero.deserialize),
        HeroGroup2: JSON.parse(localStorage.getItem('HeroGroup2') || '[]').map(Hero.deserialize),
    }),
    getters: {
        heroById: (state) => (id) => {
            return state.heroes.find(hero => hero.name === id);
        }
    },
    actions: {
        selectHero(heroName) {
            const heroData = this.heroes.find(hero => hero.name === heroName);
            if (!heroData) {
                console.error('Hero data not found');
                return;
            }
            console.log(this.HeroGroup1.length);
            if (this.HeroGroup1.length < 5) {
                this.selectedHero = new Hero(heroData);
                this.selectedHero.heroGroup = 1;
            } else if (this.HeroGroup2.length < 5) {
                this.selectedHero = new Hero(heroData);
                this.selectedHero.heroGroup = 2;
}
        },

        confirmHeroSelection(groupNumber) {
            if (!this.selectedHero) {
                console.error("No hero selected to confirm.");
                return;
            }

            if (groupNumber === 1 && this.HeroGroup1.length < 5) {
                this.HeroGroup1.push(this.selectedHero);
                this.saveHeroData('HeroGroup1', this.HeroGroup1);
            } else if (groupNumber === 2 && this.HeroGroup2.length < 5) {
                this.HeroGroup2.push(this.selectedHero);
                this.saveHeroData('HeroGroup2', this.HeroGroup2);
            } else {
                console.error('The selected hero group is full');
            }

            // Clear the selectedHero after adding it to a group
            this.selectedHero = null;
        },


        saveHeroData(groupKey, heroDataArray) {
            localStorage.setItem(groupKey, JSON.stringify(heroDataArray.map(hero => hero.serialize())));
        },

        loadHeroData() {
            this.HeroGroup1 = JSON.parse(localStorage.getItem('HeroGroup1') || '[]').map(Hero.deserialize);
            this.HeroGroup2 = JSON.parse(localStorage.getItem('HeroGroup2') || '[]').map(Hero.deserialize);
        },

        clearHeroData() {
            localStorage.removeItem('HeroGroup1');
            localStorage.removeItem('HeroGroup2');
            this.HeroGroup1 = [];
            this.HeroGroup2 = [];
        },
    }
});
