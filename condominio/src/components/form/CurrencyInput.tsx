import { NumericFormat } from "react-number-format";
import { Input, InputProps, inputVariants } from "./input";
import { type ComponentProps, forwardRef, type ComponentType, ReactNode } from "react";
import { type FieldErrors } from "react-hook-form";

import { VariantProps } from "class-variance-authority";

export type CurrencyInputProps = {
  errors?: FieldErrors;
  label?: ReactNode;
  srOnly?: boolean;
  staticSuffix?: boolean;
  min?: number;
  max?: number | string;
  currency?: string;
} & Omit<ComponentProps<typeof NumericFormat>, "size" | "min" | "max"> &
  Omit<InputProps, "onChange" > &
  VariantProps<typeof inputVariants>;

export const CurrencyInput = forwardRef<HTMLDivElement, CurrencyInputProps>(
  (
    {
      staticSuffix = true,
      min = -10000000000000,
      max = 10000000000000,
      allowNegative = false,
      thousandsGroupStyle = "thousand",
      thousandSeparator = ".",
      decimalScale = 2,
      placeholder = "0,00",
      fixedDecimalScale = true,
      currency,
      decimalSeparator = ",",
      value,
      ...currencyProps
    },
    ref
  ) => {
    return (
      <NumericFormat<Omit<InputProps,  "onChange">>
        thousandsGroupStyle="thousand"
        thousandSeparator="."
        decimalScale={2}
        autoComplete="off"
        placeholder={placeholder}
        allowNegative={allowNegative}
        fixedDecimalScale={fixedDecimalScale}
        decimalSeparator={decimalSeparator}
        getInputRef={ref}
        inputSuffix={
          staticSuffix ? (
            <span className="px-0.5 text-gray-800 select-none">{currency}</span>
          ) : undefined
        }
        value={value ?? 0}
        isAllowed={(values) => {
          const { floatValue } = values;
          if (!floatValue || typeof max === "string") return true;

          return floatValue < max && floatValue >= min;
        }}
        customInput={Input as ComponentType<unknown>}
        {...currencyProps}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
