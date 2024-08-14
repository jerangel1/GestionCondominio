import { type VariantProps } from "class-variance-authority";
import { type  InputHTMLAttributes } from "react";
import { type  FieldErrors } from "react-hook-form";
import { select } from "./styles";

export type DEFAULT_OPTION = {
  id: string | number;
  value: string | number;
  [key: string]: unknown;
};

export type SelectProps<T extends DEFAULT_OPTION> = {
  errors?: FieldErrors;
  label: string;
  srOnly?: boolean;
  name: string;
  accessKey?: keyof T;
  width?: number;
  required?: boolean;
  onChange: (obj: T) => void;
  data?: T[];
  className?: string;
  getValueFn?: (option: T | null) => string;
  dropdownWidth?: number,
  value?: string | number | readonly string[] | undefined | null
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "name" | "onChange" | "size" | "value"> &
  VariantProps<typeof select>;

  export type SelectScrollInfiniteProps<T extends DEFAULT_OPTION> = {
    errors?: FieldErrors;
    label: string;
    srOnly?: boolean;
    name: string;
    accessKey?: keyof T;
    width?: number;
    required?: boolean;
    onChange: (obj: T) => void;
    data?: T[];
    getValueFn?: (option: T | null) => string;
    fetchData: () => Promise<T[]>;
  } & Omit<InputHTMLAttributes<HTMLSelectElement>, "name" | "onChange" | "size"> &
    VariantProps<typeof select>;