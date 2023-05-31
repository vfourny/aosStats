<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button
      ></ion-buttons>
      <ion-title> Header </ion-title>
      <ion-buttons slot="end">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from "@ionic/vue";
</script>
