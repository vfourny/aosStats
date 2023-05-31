<template>
  <SideMenu contentId="main-content" />
  <ion-page id="main-content">
    <ion-content> <AccountSettings /></ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import AccountSettings from "@/components/AccountSettings.vue";
import SideMenu from "@/components/SideMenu.vue";
</script>
