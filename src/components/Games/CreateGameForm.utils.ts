import {
  BATTLE_TACTIC,
  FACTION,
  GRAND_STRATEGY,
  SCENARIO,
  SUBFACTION,
} from "@/types/enums";
import { FACTIONS, SEASONS } from "@/utils/const";
import { FORM_FIELD_TYPE, FormFieldModel } from "../UI/FormField.utils";
import { getKeyByValue } from "@/utils/common.utils";
import * as yup from "yup";
import { t } from "@/services/i18n";

export const validationSchema = yup.object({
  currentScenario: yup
    .mixed<SCENARIO>()
    .oneOf(Object.keys(SCENARIO) as SCENARIO[])
    .defined(),
  notes: yup.string(),
  opponent: yup.object().shape({
    faction: yup
      .mixed<FACTION>()
      .oneOf(Object.keys(FACTION) as FACTION[])
      .defined(),
    name: yup.string().defined(),
    subfaction: yup
      .mixed<SUBFACTION>()
      .oneOf(Object.keys(SUBFACTION) as SUBFACTION[])
      .defined(),
  }),
  player: yup.object().shape({

    currentGrandStrategy: yup
      .mixed<GRAND_STRATEGY>()
      .oneOf(Object.keys(GRAND_STRATEGY) as GRAND_STRATEGY[])
      .defined(),
    // name: yup.string().defined(),
    faction: yup
      .mixed<FACTION>()
      .oneOf(Object.keys(FACTION) as FACTION[])
      .defined(),
    isGrandStrategyValidate: yup.boolean().defined(),
    subfaction: yup
      .mixed<SUBFACTION>()
      .oneOf(Object.keys(SUBFACTION) as SUBFACTION[])
      .defined(),
  }),
  score: yup.number().min(0).max(20).defined(),
  season: yup.number().defined(),
  version: yup.number().defined()
});

export const getCreateGameFields = (): FormFieldModel[] => [
  {
    label: t("games.labels.version"),
    name: "version",
    type: FORM_FIELD_TYPE.NUMBER,
  },
  {
    hasDependencies: true,
    label: t("games.labels.season"),
    name: "season",
    type: FORM_FIELD_TYPE.NUMBER
  },
  {
    hasDependencies: true,
    label: t("games.labels.scenario"),
    name: "currentScenario",
    selectOptions: {
      items: SEASONS.flatMap((season) =>
        season.scenarios.map((scenario) => ({
          filters: [{
            dependentFieldKey: 'version',
            requiredValue: season.version
          },
          {
            dependentFieldKey: 'season',
            requiredValue: season.seasonNumber
          }],
          key: getKeyByValue(SCENARIO, scenario),
          value: scenario
        }))
      ),
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    label: t("games.labels.faction"),
    name: "player.faction",
    selectOptions: {
      items: FACTIONS.map((faction) => ({
        key: faction.key,
        value: faction.name,
      })),
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    hasDependencies: true,
    label: t("games.labels.subfaction"),
    name: "player.subfaction",
    selectOptions: {
      items: FACTIONS.flatMap((faction) =>
        faction.subfactions.map((subfaction) => ({
          filters: [{
            dependentFieldKey: 'player.faction',
            requiredValue: faction.key
          }],
          key: getKeyByValue(SUBFACTION, subfaction),
          value: subfaction,
        }))
      ),
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    hasDependencies: true,
    label: t("games.labels.grandStrategy"),
    name: "player.currentGrandStrategy",
    selectOptions: {
      items: [
        ...FACTIONS.flatMap((faction) =>
          faction.grandStrategies.map((grandStrategy) => ({
            filters: [{
              dependentFieldKey: 'player.faction',
              requiredValue: faction.key
            }],
            key: getKeyByValue(GRAND_STRATEGY, grandStrategy),
            value: grandStrategy,
          }))
        ), ...SEASONS.flatMap(season => season.grandStrategies.map(grandStrategy => ({
          filters: [{
            dependentFieldKey: 'version',
            requiredValue: season.version
          },
          {
            dependentFieldKey: 'season',
            requiredValue: season.seasonNumber
          }],
          key: getKeyByValue(GRAND_STRATEGY, grandStrategy),
          value: grandStrategy,
        })))],
    },
    type: FORM_FIELD_TYPE.SELECT,
  },

  {
    label: t("games.labels.isGrandStrategyValidate"),
    name: "player.isGrandStrategyValidate",
    type: FORM_FIELD_TYPE.TOGGLE,
  },
  {
    hasDependencies: true,
    label: t("games.labels.battleTactics"),
    name: "player.currentBattletactics",
    selectOptions: {
      hasMultiple: true,
      items: [...FACTIONS.flatMap((faction) =>
        faction.battleTactics.map((battleTactic) => ({
          filters: [{
            dependentFieldKey: 'player.faction',
            requiredValue: faction.key
          }],
          key: getKeyByValue(BATTLE_TACTIC, battleTactic),
          value: battleTactic,
        }))
      ), ...SEASONS.flatMap(season => season.battleTactics.map(battleTactic => ({
        filters: [{
          dependentFieldKey: 'version',
          requiredValue: season.version
        },
        {
          dependentFieldKey: 'season',
          requiredValue: season.seasonNumber
        }],
        key: getKeyByValue(GRAND_STRATEGY, battleTactic),
        value: battleTactic,
      })))],
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    label: t("games.labels.name"),
    name: "opponent.name",
    type: FORM_FIELD_TYPE.TEXT,
  },
  {
    label: t("games.labels.faction"),
    name: "opponent.faction",
    selectOptions: {
      items: FACTIONS.map((faction) => ({
        key: faction.key,
        value: faction.name,
      })),
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    hasDependencies: true,
    label: t("games.labels.subfaction"),
    name: "opponent.subfaction",
    selectOptions: {
      items: FACTIONS.flatMap((faction) =>
        faction.subfactions.map((subfaction) => ({
          filters: [{
            dependentFieldKey: 'opponent.faction',
            requiredValue: faction.key
          }],
          key: getKeyByValue(SUBFACTION, subfaction),
          value: subfaction,
        }))
      ),
    },
    type: FORM_FIELD_TYPE.SELECT,
  },
  {
    label: t("games.labels.score"),
    name: "score",
    type: FORM_FIELD_TYPE.NUMBER,
  },
  {
    label: t("games.labels.notes"),
    name: "notes",
    type: FORM_FIELD_TYPE.TEXTAREA,
  },
];
