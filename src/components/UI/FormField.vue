<template>
  <ion-label>{{ props.label }}</ion-label>
  <ion-checkbox
    v-if="props.type === FORM_FIELD_TYPE.CHECKBOX"
    :name="props.name"
    v-model="value"
    :disabled="isDisabled"
  ></ion-checkbox>
  <ion-toggle
    v-else-if="props.type === FORM_FIELD_TYPE.TOGGLE"
    :disabled="isDisabled"
    v-model="value"
  >
    {{ props.label }}
  </ion-toggle>
  <ion-textarea
    v-else-if="props.type === FORM_FIELD_TYPE.TEXTAREA"
    label-placement="floating"
    fill="outline"
    :placeholder="props.placeholder"
    :name="props.name"
    v-model="value"
    :disabled="isDisabled"
  ></ion-textarea>
  <ion-select
    v-else-if="props.type === FORM_FIELD_TYPE.SELECT"
    :multiple="props.selectOptions?.hasMultiple"
    interface="action-sheet"
    :name="props.name"
    :placeholder="props.placeholder"
    v-model="value"
    :disabled="isDisabled"
  >
    <ion-select-option
      v-for="item in selectOptionsItems"
      :key="item.key"
      :value="item.key"
      >{{ item.value }}</ion-select-option
    >
  </ion-select>
  <ion-input
    v-else
    :placeholder="props.placeholder"
    :name="props.name"
    v-model="value"
    :type="props.type"
    :disabled="isDisabled"
  ></ion-input>
</template>

<script setup lang="ts">
import { FORM_FIELD_TYPE, FormFieldModel } from "./FormField.utils";
import {
  IonSelect,
  IonInput,
  IonTextarea,
  IonCheckbox,
  IonLabel,
  IonSelectOption,
  IonToggle,
} from "@ionic/vue";
import { filterCallback } from "chart.js/dist/core/core.plugins";
import _ from "lodash";
import { useField, useFieldValue } from "vee-validate";
import { defineProps, computed, ref } from "vue";

const props = defineProps<FormFieldModel>();

const { value, errorMessage } = useField<string | number | boolean>(props.name);

const isDisabled = computed(() => {
  if (props.hasDependencies && props.selectOptions) {
    const dependentFieldKeys = _.uniq(
      props.selectOptions.items.flatMap(
        (item) =>
          item.filters && item.filters.map((filter) => filter.dependentFieldKey)
      )
    );

    const dependencyValues = dependentFieldKeys.map((fieldKey) =>
      useFieldValue(fieldKey)
    );

    const isAllValuePresent = dependencyValues?.every((field) => field.value);

    return !isAllValuePresent ? true : false;
  }
  return props.isDisabled ? true : false;
});

const selectOptionsItems = computed(() => {
  if (
    props.type === FORM_FIELD_TYPE.SELECT &&
    props.selectOptions?.items.some(
      (item) => item.filters && item.filters.length > 0
    )
  ) {
    const filteredItems = props.selectOptions?.items?.filter((item) => {
      return item.filters?.every(
        (filter) =>
          filter.requiredValue == useFieldValue(filter.dependentFieldKey).value
      );
    });
    return filteredItems;
  }
  return props.selectOptions?.items;
});
</script>
