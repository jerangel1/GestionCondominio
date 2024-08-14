import { HTMLInputTypeAttribute } from "react";

import { OptionInterface } from "./Option.interface";

export interface InputField {
  key:       never;
  value:     number | string;
  data?:     OptionInterface[];
  disabled?: boolean;
  label?:    string;
  rules?:    { required?: boolean; minLength?: number; min?: number };
  type?:     HTMLInputTypeAttribute | "select";
}
