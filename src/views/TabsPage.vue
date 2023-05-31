<template>
  <SideMenu contentId="main-content" />
  <ion-page id="main-content">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button
          v-for="tab in tabs"
          :key="tab.name"
          :tab="tab.name"
          :href="tab.href"
        >
          <font-awesome-icon :icon="`fa-solid ${tab.icon}`" size="2xl" />
          <ion-label>{{ tab.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faScroll,
  faChartSimple,
  faWandSparkles,
  faBurst,
} from "@fortawesome/free-solid-svg-icons";
import SideMenu from "@/components/SideMenu.vue";

library.add(faScroll, faChartSimple, faWandSparkles, faBurst);

const tabs = [
  {
    href: "/tabs/datacards",
    icon: "fa-scroll",
    label: "Datacards",
    name: "datacards",
  },
  {
    href: "/tabs/games",
    icon: "fa-burst",
    label: "Parties",
    name: "games",
  },
  {
    href: "/tabs/armory",
    icon: "fa-wand-sparkles",
    label: "Armurerie",
    name: "armory",
  },
  {
    href: "/tabs/stats",
    icon: "fa-chart-simple",
    label: "Statistiques",
    name: "stats",
  },
];
</script>
