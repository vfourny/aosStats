<template>
  <form @submit.prevent="handleFormSubmit">
    <FormField
      v-for="field in fields"
      :key="field.name"
      :label="field.label"
      :name="field.name"
      :type="field.type"
    />
    <ion-button type="submit" color="danger">Submit</ion-button>
  </form>
</template>

<script lang="ts" setup>
import FormField from "@/components/UI/FormField.vue";
import { IonButton } from "@ionic/vue";
import { getSettingsFields } from "./AccountSettings.utils";

const fields = getSettingsFields();
const handleFormSubmit = () => {
  console.log("ok");
};
</script>
