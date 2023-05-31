<template>
  <HeaderApp />
  <ion-content>
    <ion-list>
      <ion-item-sliding v-for="game in games" :key="game.id">
        <ion-item :color="getColor(game.score)">
          <ion-label>
            <span>{{ getFactionAccronym(game.player_faction) }}</span>
            <span> vs </span>
            <span>{{ getFactionAccronym(game.opponent_faction) }}</span>
            <span> ({{ game.opponent_name }})</span>
            <span> -</span>
            <span> {{ game.scenario }}</span>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option color="warning">
            <ion-nav-link
              router-direction="forward"
              :component="updateGameFormComponent"
            >
              <ion-icon
                slot="icon-only"
                :icon="icons.edit"
                size="large"
              ></ion-icon>
            </ion-nav-link>
          </ion-item-option>
          <ion-item-option color="danger">
            <ion-icon
              slot="icon-only"
              :icon="icons.delete"
              siez="large"
              @click="deleteGame(game.id)"
            ></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
    <ion-nav-link
      router-direction="forward"
      :component="createGameFormComponent"
    >
      <ion-fab vertical="bottom" horizontal="end">
        <ion-fab-button>
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-nav-link>
  </ion-content>
</template>

<script setup lang="ts">
import CreateGameForm from "@/components/Games/CreateGameForm.vue";
import UpdateGameForm from "@/components/Games/UpdateGameForm.vue";
import {
  IonNavLink,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonContent,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import HeaderApp from "../HeaderApp.vue";
import { useUserStore } from "@/store/user";
import { getGamesByPlayerId } from "@/api/games";
import { onMounted, ref } from "vue";
import { pencil, trash } from "ionicons/icons";
import { deleteGameById } from "@/api/games";
import _ from "lodash";
import { FACTIONS } from "@/utils/const";

const { state } = useUserStore();

const createGameFormComponent = CreateGameForm;
const updateGameFormComponent = UpdateGameForm;
const games = ref([]);
const ionItemSlidingRef = ref([]);
const icons = {
  delete: trash,
  edit: pencil,
};

const getColor = (score: number) => {
  if (score === 10) return "warning";
  if (score < 10) return "danger";
  return "success";
};

const getFactionAccronym = (factionKey: string) => {
  return FACTIONS.find((faction) => faction.key === factionKey)?.accronym;
};

const fetchGames = async () => {
  if (state.profile) games.value = await getGamesByPlayerId(state.profile.id);
};

const deleteGame = async (gameId: string) => {
  await deleteGameById(gameId);
  games.value = _.remove(games.value, (game) => game.id === gameId);
};

onMounted(fetchGames);
</script>
