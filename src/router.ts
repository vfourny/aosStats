import { useUserStore } from "@/store/user";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/TabsPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import GamesPage from "@/views/GamesPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";

export enum ROUTE_NAMES {
  CARDS_COLLECTIONS = "cards-collections",
  DATA_CARDS = "cards",
  GAMES = "games",
  LOGIN = "login",
  SETTINGS = "settings",
}

const authValidator = async (to: any, from: any, next: any) => {
  const { isLoggedIn } = useUserStore();

  if (isLoggedIn) {
    if (to.name === ROUTE_NAMES.LOGIN) next({ name: ROUTE_NAMES.GAMES });
    else next();
  } else if (to.name === ROUTE_NAMES.LOGIN) next();
  else next({ name: ROUTE_NAMES.LOGIN });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: { name: ROUTE_NAMES.GAMES },
  },
  {
    beforeEnter: authValidator,
    component: LoginPage,
    name: ROUTE_NAMES.LOGIN,
    path: "/login",
  },
  {
    beforeEnter: authValidator,
    component: SettingsPage,
    name: ROUTE_NAMES.SETTINGS,
    path: "/settings",
  },
  {
    children: [
      {
        path: "",
        redirect: { name: ROUTE_NAMES.GAMES },
      },
      // {
      //   path: ROUTE_NAMES.CARDS_COLLECTIONS,
      //   name: ROUTE_NAMES.CARDS_COLLECTIONS,
      //   component: CardsCollections,
      //   beforeEnter: authValidator,
      // },
      {
        beforeEnter: authValidator,
        component: GamesPage,
        name: ROUTE_NAMES.GAMES,
        path: ROUTE_NAMES.GAMES,
      },
    ],
    component: TabsPage,
    path: "/tabs/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
