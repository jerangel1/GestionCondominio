import { NumericFormat } from "react-number-format";
import { type ComponentProps, forwardRef, type ComponentType } from "react";
import { Input, inputVariants, type InputProps } from "./input";

import { VariantProps } from "class-variance-authority";

export type DNIInputProps = {
  onChange: (v: string) => void;
} & Omit<ComponentProps<typeof NumericFormat>, "size" | "min" | "max"> &
  Omit<InputProps, "onChange"> &
  VariantProps<typeof inputVariants>;

export const DNIInput = forwardRef<HTMLDivElement, DNIInputProps>(
  ({ label, onChange, ...DNIProps }, ref) => {
    return (
      <NumericFormat<Omit<InputProps, "onChange">>
        {...DNIProps}
        label={label}
        decimalSeparator=","
        prefix="C.I. "
        getInputRef={ref}
        thousandsGroupStyle="thousand"
        thousandSeparator="."
        isAllowed={({ floatValue }) => {
          if (typeof floatValue === "undefined") return true;

          const MAX_LIMIT = 99999999;
          const MIN_LIMIT = 0;

          return MIN_LIMIT <= floatValue && floatValue <= MAX_LIMIT;
        }}
        allowNegative={false}
        customInput={Input as ComponentType<unknown>}
        onValueChange={({ value }) => {
          onChange(value);
        }}
      />
    );
  }
);

DNIInput.displayName = "DNIInput";
