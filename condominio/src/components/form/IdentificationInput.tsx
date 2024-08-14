import React, { useEffect } from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { type ComponentType } from "react";
import { Input, type InputProps } from "./input";
import { useSelect } from "downshift";
import { cva } from "class-variance-authority";
import { type DEFAULT_OPTION } from "./types";
import clsx from "clsx";
import { DropdownContainer } from "./utils/DropdownContainer";
import { type FieldErrors } from "react-hook-form";

type IdentificationInputOutput = {
  selectValue: DEFAULT_OPTION;
  inputValue?: string;
};

const MAX_LIMIT = 9999999999999;
const MIN_LIMIT = 0;

const selectOptions = [
  { id: 1, value: "V", label: "Venezolano" },
  { id: 2, value: "E", label: "Extranjero" },
  { id: 3, value: "P", label: "Pasaporte" },
  { id: 4, value: "J", label: "Jurídico" },
  { id: 5, value: "G", label: "Gubernamental" },
];

type CustomFieldProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  | "ref"
  | "className"
  | "size"
  | "defaultValue"
  | "onChange"
  | "type"
  | "id"
  | "name"
  | "value"
> & {
  value?: string;
  name: string;
  size?: "extrasmall" | "small" | "medium" | undefined;
  label: string;
  errors?: FieldErrors;
  srOnly?: boolean;
  RenderOption?: (option: DEFAULT_OPTION) => JSX.Element;
  onChange: (data?: IdentificationInputOutput) => void;
};

export const inputButtonVariants = cva(
  [
    "flex",
    "bottom-0",
    "w-12",
    "bg-zinc-50",
    "text-black",
    "hover:bg-zinc-100",
    "focus:ring-2",
    "absolute",
    "z-10",
    "focus:ring-secondary-300",
    "border",
    "rounded-l-lg",
    "border-solid",
    "border-[#000449]/30",
    "cursor-pointer",
    "flex-row",
    "gap-2",
    "items-center",
    "top-6",
    "bg-transparent",
    "text-left",
    "sm:text-sm",
    "sm:leading-6",
    "border",
  ],
  {
    variants: {
      size: {
        extrasmall: ["text-xs", "py-1", "px-1", "h-6"],
        small: ["text-xs", "py-1", "px-1", "h-9"],
        medium: ["text-sm", "py-2", "px-2", "h-10"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const IdentificationInput = ({
  size,
  label,
  errors,
  onChange,
  ...rest
}: CustomFieldProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<DEFAULT_OPTION>(
    selectOptions[0]
  );

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<DEFAULT_OPTION>({
    items: selectOptions,
    itemToString: (item) => (item ? item.value.toString() : ""),
    onSelectedItemChange(v) {
      if (v) {
        setSelectValue(v.selectedItem);
      }
    },
  });

  useEffect(() => {
    onChange({
      inputValue,
      selectValue,
    });
  }, [inputValue, selectValue]);

  return (
    <div className="flex flex-col relative">
      <div className="flex w-full  flex-row gap-1.5 relative">
        <div
          {...getToggleButtonProps()}
          className={clsx(inputButtonVariants({ size }))}
        >
          {selectValue.value}
          <i
            aria-hidden="true"
            className={clsx(
              "i-fa6-solid-chevron-left bg-black w-2.5 h-2.5 transition",
              isOpen && "-rotate-90"
            )}
          />
        </div>
        <div className="w-full">
          <NumericFormat<Omit<InputProps, "onChange">>
            errors={errors}
            label={label}
            decimalSeparator=","
            size={size}
            className="pl-[60px]"
            thousandsGroupStyle="thousand"
            thousandSeparator="."
            isAllowed={({ floatValue }) => {
              if (typeof floatValue === "undefined") return true;
              return MIN_LIMIT <= floatValue && floatValue <= MAX_LIMIT;
            }}
            autoComplete="off"
            allowNegative={false}
            customInput={Input as ComponentType<unknown>}
            onValueChange={({ value }) => {
              setInputValue(value);
            }}
            {...rest}
          />
        </div>
      </div>
      <div className="absolute mt-[64px] z-30 w-full" {...getMenuProps()}>
        <DropdownContainer width={180} isOpen={isOpen} as="ul">
          {selectOptions.map((option, index) => (
            <li
              className={clsx(
                highlightedIndex === index && "bg-zinc-100",
                selectedItem === option &&
                  "font-bold bg-zinc-50 hover:bg-zinc-100",
                "py-2 select-none px-3 text-sm text-gray-700 hover:cursor-pointer flex flex-row items-center justify-between"
              )}
              key={option.value}
              {...getItemProps({
                index: index,
                item: option,
              })}
            >
              <div className="leading-snug w-[calc(100%-30px)] flex items-end  gap-1.5">
                {[option.value, "-", option.label].join(" ")}
              </div>
            </li>
          ))}
        </DropdownContainer>
      </div>
    </div>
  );
};
