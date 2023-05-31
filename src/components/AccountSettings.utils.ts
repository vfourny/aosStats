import {
  FORM_FIELD_TYPE,
  FormFieldModel,
} from "@/components/UI/FormField.utils";
import * as yup from "yup";
import { t } from "@/services/i18n";

export const validationSchema = yup.object({
  username: yup.string().defined(),
});

export const getSettingsFields = (): FormFieldModel[] => [
  {
    label: t("games.labels.scenario"),
    name: "username",
    type: FORM_FIELD_TYPE.TEXT,
  },
];
