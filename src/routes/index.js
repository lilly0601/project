import { createRouter, createWebHashHistory } from 'vue-router';
import CategoriesList from '../components/CategoriesList.vue';
import WishlistItems from '../components/WishlistItems.vue';

const routes = [
    { path: '/', name: 'CategoriesList', component: CategoriesList },
    { path: '/WishlistItems', name: 'WishlistItems', component: WishlistItems },
];

const router = createRouter({
    history: createWebHashHistory(),  // <<< ВАЖНО
    routes,
});

// navigation guard
router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem('userId');

    if (!userId && to.name !== 'WishlistItems') {
        // если нет userId и пытаемся на главную → редирект на WishlistItems
        next({ name: 'WishlistItems' });
    } else if (userId && to.name === 'WishlistItems') {
        // если есть userId и пытаемся на WishlistItems → редирект на CategoriesList
        next({ name: 'CategoriesList' });
    } else {
        next();
    }
});

export default router;