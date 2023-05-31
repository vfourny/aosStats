<template>
  <HeaderApp />
  <ion-content>
    <form @submit.prevent="handleFormSubmit">
      <ion-list>
        <ion-item v-for="field in fields" :key="field.name">
          <FormField
            :label="field.label"
            :type="field.type"
            :name="field.name"
            :selectOptions="field.selectOptions"
            :placeholder="field.placeholder"
            :hasDependencies="field.hasDependencies"
          />
        </ion-item>
      </ion-list>
      <ion-button type="submit" color="success">{{
        t("common.label.save")
      }}</ion-button>
    </form>
    {{ errors }}
  </ion-content>
</template>

<script setup lang="ts">
import { IonButton, IonList, IonItem, IonContent } from "@ionic/vue";
import FormField from "../UI/FormField.vue";
import HeaderApp from "@/components/HeaderApp.vue";

import { computed } from "vue";
import { useForm } from "vee-validate";
import { getCreateGameFields, validationSchema } from "./CreateGameForm.utils";
import { GameModel } from "@/types/models";
import { useUserStore } from "@/store/user";
import { createGame } from "@/api/games";
import { t } from "@/services/i18n";

const fields = getCreateGameFields();
const validationRules = computed(() => validationSchema);
const { state } = useUserStore();

const {
  errors,
  values: formValues,
  handleSubmit,
} = useForm<GameModel>({
  initialValues: {
    notes: "",
    player: {
      id: state.profile?.id ?? "",
      isGrandStrategyValidate: false,
    },
    score: 0,
  },
  validationSchema: validationRules,
});

const onSubmit = async () => {
  // Soumettre les données du formulaire
  console.log(formValues.player.currentBattleTactics);
  const data = await createGame({
    battle_tactics: formValues.player.currentBattleTactics,
    is_grand_strategy_validate: formValues.player.isGrandStrategyValidate,
    notes: formValues.notes,
    opponent_faction: formValues.opponent.faction,
    opponent_name: formValues.opponent.name,
    opponent_subfaction: formValues.opponent.subfaction,
    player_faction: formValues.player.faction,
    player_grand_strategy: formValues.player.currentGrandStrategy,
    player_id: formValues.player.id,
    player_subfaction: formValues.player.subfaction,
    scenario: formValues.currentScenario,
    score: formValues.score,
  });
};

const onSubmitError = (errors) => {
  // Gérer les erreurs de validation
  console.log(errors);
};

const handleFormSubmit = handleSubmit(onSubmit, onSubmitError);
</script>
