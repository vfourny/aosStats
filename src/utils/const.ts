import {
  SUBFACTION,
  FACTION,
  GRAND_ALLIANCE,
  GRAND_STRATEGY,
  BATTLE_TACTIC,
  SCENARIO,
} from "@/types/enums";
import { FactionModel, SeasonModel } from "@/types/models";
import { getKeyByValue } from "@/utils/common.utils";

export const FACTIONS: FactionModel[] = [
  {
    accronym: 'SBG',
    battleTactics: [
      BATTLE_TACTIC.SBG_CALLOUS_OVERLORD,
      BATTLE_TACTIC.SBG_CURSED_UNLIFE,
      BATTLE_TACTIC.SBG_ENDLESS_NIGHTMARE,
      BATTLE_TACTIC.SBG_EXPAND_THE_GRAVE_EMPIRE,
      BATTLE_TACTIC.SBG_GRASPING_DEAD,
      BATTLE_TACTIC.SBG_THE_CHOICEST_VINTAGE
    ],
    grandAlliance: GRAND_ALLIANCE.DEATH,
    grandStrategies: [
      GRAND_STRATEGY.SBG_CRIMSON_LARDER,
      GRAND_STRATEGY.SBG_DANSE_MACABRE,
      GRAND_STRATEGY.SBG_EMPIRE_OF_CORPSE,
      GRAND_STRATEGY.SBG_LUST_FOR_DOMINATION],
    key: getKeyByValue(FACTION, FACTION.SOULBLIGHT_GRAVELORDS),
    name: FACTION.SOULBLIGHT_GRAVELORDS,
    subfactions: [
      SUBFACTION.SBG_AVENGORII,
      SUBFACTION.SBG_BLOOD_LEGION,
      SUBFACTION.SBG_VYRKOS_DINASTY,
      SUBFACTION.SBG_KASTELAI,
      SUBFACTION.SBG_NIGHT_LEGION
    ]
  },
  {
    accronym: 'OBR',
    battleTactics: [BATTLE_TACTIC.SBG_CALLOUS_OVERLORD],
    grandAlliance: GRAND_ALLIANCE.DEATH,
    grandStrategies: [GRAND_STRATEGY.SBG_LUST_FOR_DOMINATION],
    key: getKeyByValue(FACTION, FACTION.OSSIARCH_BONEREAPERS),
    name: FACTION.OSSIARCH_BONEREAPERS,
    subfactions: [SUBFACTION.OBR_PETRIFEX_ELITE]
  },
  {
    accronym: 'STD',
    battleTactics: [BATTLE_TACTIC.SBG_CALLOUS_OVERLORD],
    grandAlliance: GRAND_ALLIANCE.CHAOS,
    grandStrategies: [GRAND_STRATEGY.SBG_LUST_FOR_DOMINATION],
    key: getKeyByValue(FACTION, FACTION.SLAVES_TO_DARKNESS),
    name: FACTION.SLAVES_TO_DARKNESS,
    subfactions: [SUBFACTION.STD_CABALISTS, SUBFACTION.STD_DESPOILERS]
  },
];

export const SEASONS: SeasonModel[] = [
  {
    battleTactics: [
      BATTLE_TACTIC.CORE_AN_EYE_FOR_AN_EYE,
      BATTLE_TACTIC.CORE_A_MATTER_OF_HONOUR,
      BATTLE_TACTIC.CORE_CUNNING_MANOEUVRE,
      BATTLE_TACTIC.CORE_DESECRATE_THEIR_LANDS,
      BATTLE_TACTIC.CORE_GAINING_MOMENTUM,
      BATTLE_TACTIC.CORE_LEAD_THE_ASSAULT,
      BATTLE_TACTIC.CORE_THIS_ONES_MINE,
      BATTLE_TACTIC.CORE_UNITED_OFFENCE,
    ],
    grandStrategies: [
      GRAND_STRATEGY.CORE_DEFEND_WHATS_OURS,
      GRAND_STRATEGY.CORE_STAKE_A_CLAIM,
      GRAND_STRATEGY.CORE_SURVIVORS_INSTINCT,
      GRAND_STRATEGY.CORE_TAKE_WHATS_THEIR,
      GRAND_STRATEGY.CORE_TAME_THE_LAND,
      GRAND_STRATEGY.CORE_THE_DAY_IS_OURS,
    ],
    scenarios: [
      SCENARIO.BATTLELINES_DRAWN,
      SCENARIO.JAWS_OF_GALLET,
      SCENARIO.LURKERS_BELOW,
      SCENARIO.NIDUS_PATHS,
      SCENARIO.ONLY_THE_WORTHY,
      SCENARIO.OURS_FOR_THE_TAKING,
      SCENARIO.PATH_OF_A_CHAMPION,
      SCENARIO.POSITION_OVERPOWER,
      SCENARIO.PRESENCE_OF_IDOLS,
      SCENARIO.PRIZE_OF_GALLET,
      SCENARIO.REALMSTONE_CACHE,
      SCENARIO.TWIST_AND_TURN,
    ],
    seasonNumber: 2,
    version: 3
  }
]