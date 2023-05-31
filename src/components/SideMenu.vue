<template>
  <ion-menu ref="menu" :content-id="props.contentId">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-button router-link="/settings">Settings</ion-button>
        </ion-item>
        <ion-item>
          <ion-label @click="logoutSession">Déconnexion</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonMenu,
  IonToolbar,
  IonTitle,
  IonContent,
  IonHeader,
  IonList,
  IonItem,
  IonButton,
  IonLabel,
} from "@ionic/vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

import { defineProps, ref } from "vue";

interface SideMenuModel {
  contentId: string;
}

const props = defineProps<SideMenuModel>();

const { logOut } = useUserStore();
const router = useRouter();
const menu = ref();

const logoutSession = async () => {
  try {
    await logOut();
    router.push({ name: "login" });
    menu.value.$el.close();
  } catch (err) {
    console.log("erreur");
  }
};
</script>
