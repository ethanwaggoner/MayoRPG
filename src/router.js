import { createWebHistory, createRouter } from 'vue-router'

const BattleView = () => import('./views/BattleView.vue');
const StartScreenView = () => import('./views/StartScreenView.vue');
const NewChooseHeroView = () => import('./views/NewChooseHeroView.vue');
const MainDashboardView = () => import('./views/MainDashboardView.vue');
const NewChooseClassView = () => import('./views/NewChooseClassView.vue');

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
    },
    {
        path: '/main/dashboard',
        name: 'MainDashboard',
        component: MainDashboardView,
    },
    {
        path: '/new/choose-class',
        name: 'NewChooseClass',
        component: NewChooseClassView
    },
    {
        path: '/battle',
        name: 'Battle',
        component: BattleView
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;