<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <form class="login-form">
        <ion-button expand="block" @click="googleAuth"
          >Log In with google</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import {
  IonButton,
  IonContent,
  IonPage,
  loadingController,
  toastController,
} from "@ionic/vue";

const { loginWithGoogle } = useUserStore();

const googleAuth = async () => {
  const loader = await loadingController.create({});
  const toast = await toastController.create({ duration: 10000 });

  try {
    await loader.present();
    await loginWithGoogle();
    toast.message = "Authentification réussie";
    await toast.present();
  } catch (error) {
    console.log(error);
  }
};
</script>
