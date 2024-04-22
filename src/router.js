import { createWebHistory, createRouter } from 'vue-router'

const StartScreenView = () => import('./views/StartScreenView.vue');
const NewChooseHeroView = () => import('./views/NewChooseHeroView.vue');

const routes = [
    {
        path: '/',
        name: 'StartScreen',
        component: StartScreenView
    },
    {
        path: '/new/choose-hero',
        name: 'NewChooseHero',
        component: NewChooseHeroView
    }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;