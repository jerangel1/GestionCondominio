import React, { useEffect } from "react";
import { useState } from "react";
import { NumericFormat, PatternFormat } from "react-number-format";
import { type ComponentType } from "react";
import { Input, type InputProps } from "./input";
import { useSelect } from "downshift";
import { type DEFAULT_OPTION } from "./types";
import clsx from "clsx";
import { DropdownContainer } from "./utils/DropdownContainer";
import { type FieldErrors } from "react-hook-form";
import { inputButtonVariants } from "./IdentificationInput";
import { ChevronLeft } from "lucide-react";

type IdentificationInputOutput = {
  selectValue: DEFAULT_OPTION;
  inputValue?: string;
};

const MAX_LIMIT = 9999999;
const MIN_LIMIT = 0;

const selectOptions = [
  { value: "0414", id: 0 },
  { value: "0424", id: 1 },
  { value: "0416", id: 2 },
  { value: "0426", id: 3 },
  { value: "0412", id: 4 },
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

export const NationalPhoneNumberInput = ({
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
  }, [inputValue, selectValue, onChange]);

  return (
    <div className="flex flex-col relative">
      <div className="flex w-full  flex-row gap-1.5 relative">
        <div
          {...getToggleButtonProps()}
          className={clsx(inputButtonVariants({ size, className: "w-[4.5rem]" }))}
        >
          {selectValue.value}
          <ChevronLeft
            aria-hidden="true"
            className={clsx(
              "w-4 h-4 text-primary-950 transition duration-300",
              isOpen && "-rotate-90"
            )}
          />
        </div>
        <div className="w-full">
          <PatternFormat<Omit<InputProps, "onChange">>
            errors={errors}
            label={label}
            size={size}
            format="### ####"
            className="pl-[80px]"
            isAllowed={({ floatValue }) => {
              if (typeof floatValue === "undefined") return true;
              return MIN_LIMIT <= floatValue && floatValue <= MAX_LIMIT;
            }}
            autoComplete="off"
            customInput={Input as ComponentType<unknown>}
            onValueChange={({ value }) => {
              setInputValue(value);
            }}
            {...rest}
          />
        </div>
      </div>
      <div className="absolute mt-[68px] z-30 w-full" {...getMenuProps()}>
        <DropdownContainer isOpen={isOpen} as="ul">
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
                {option.value}
              </div>
            </li>
          ))}
        </DropdownContainer>
      </div>
    </div>
  );
};
