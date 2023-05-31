<template>
  <ion-nav :root="component"></ion-nav>
</template>

<script setup lang="ts">
import { IonNav } from "@ionic/vue";
import GamesList from "@/components/Games/GamesList.vue";

const component = GamesList;
</script>
