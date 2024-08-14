import { Control, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";

export enum DateComparison {
  BEFORE = "isBefore",
  AFTER = "isAfter",
}

export enum TypeElement {
  INPUTDECIMAL = "input-decimals",
  INPUT = "input",
  SELECT = "select",
  SELECTSCROLLINFINITY = "selectScrollInfinity",
  SELECT_MULTIPLE = "selectMultiple",
  DATE = "date",
  SWITCH = "switch",
  NESTED_FORM = "nestedForm",
  NESTED_FORM_FIELD_TOTAL = "nestedFormFieldTotal",
}

export interface Field {
  uuid: string;
  typeElement?: TypeElement | any;
  name?: string | any;
  errors?: FieldErrors<FieldValues> | any;
  control?: Control<FieldValues, any> | any;
  rules?: Omit<RegisterOptions<FieldValues, any>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined;
  label?: string | any;
  dataSelect?: any | undefined;
  value?: any;
  inputAttribute?: any | undefined;
  enableOtherComponent?: boolean | any;
  otherComponent?: JSX.Element | undefined;
  dependency?: { [field: string]: any[] };
  customRules?: {
    validateDateRange?: { field: string, comparison: DateComparison }
  },
  nestedForm?: {
    multiple?: boolean,
    actions: any,
    fields: any[],
    formFields: Field[]
  },
  nestedFormMultiple?: boolean;
  nestedFormFields?: any[],
  nestedFormActions?: { append: any, remove: any },
  calc?: any,
  readOnly?: boolean,
}

export interface FormItem {
  uuid: string;
  xs_direction?: string;
  md_direction?: string;
  fields: Field[];
}