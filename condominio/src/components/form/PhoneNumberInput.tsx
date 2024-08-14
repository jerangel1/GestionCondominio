/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useMemo, useRef, useId } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import { type CountryCode, type E164Number } from "libphonenumber-js/core";
import { Input as InputBase } from "./input";
import { useSelect } from "downshift";
import { useVirtualizer } from "@tanstack/react-virtual";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import clsx from "clsx";
import { Label } from "./label";
import es from "react-phone-number-input/locale/es.json";
import {
  type FieldErrors,
  type Control,
  type FieldValues,
} from "react-hook-form";
import { useRect } from "@/hooks/useRect";
import { DropdownContainer } from "./utils/DropdownContainer";

type CustomFieldProps<T extends FieldValues> = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "ref" | "className" | "type" | "id" | "name" | "value"
> & {
  value?: E164Number;
  defaultValue?: E164Number;
  name: string;
  control: Control<T>;
  label: string;
  errors?: FieldErrors;
  srOnly?: boolean;
  dropdownWidth?: number;
};

type CountryOption = {
  id: number;
  value: CountryCode;
  label: string;
};

export const PhoneNumberInput = <T extends FieldValues>({
  defaultCountry = "VE",
  required,
  control,
  name,
  size,
  label,
  errors,
  srOnly,
  dropdownWidth,
  ...rest
}: CustomFieldProps<T> & {
  defaultCountry?: CountryCode;
}) => {
  const [country, setCountry] = useState<CountryCode>(defaultCountry);
  const listRef = useRef(null);
  const [rect, ref] = useRect();
  const id = useId();

  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";

  const countryMapping: CountryOption[] = useMemo(() => {
    return getCountries().map((countryItem, index) => {
      return {
        id: index,
        value: countryItem,
        label: getCountryCallingCode(countryItem),
      };
    });
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: countryMapping.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 42,
    overscan: 4,
  });

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<CountryOption>({
    items: countryMapping,
    itemToString: (item) => (item ? item.label : ""),
    onHighlightedIndexChange: ({ highlightedIndex, type }) => {
      if (type !== useSelect.stateChangeTypes.MenuMouseLeave) {
        rowVirtualizer.scrollToIndex(highlightedIndex);
      }
    },
    onSelectedItemChange(v) {
      if (v) {
        setCountry(v.selectedItem.value);
      }
    },
  });

  return (
    <div ref={ref} className="flex flex-col relative">
      <Label
        aria-invalid={errors && name ? !!errors[name] : false}
        srOnly={srOnly}
      >
        {label}
      </Label>
      <div className="flex w-full  flex-row gap-1.5 relative">
        <div
          className="flex top-0 bg-zinc-50 hover:bg-zinc-100 focus:ring-2 absolute z-10 focus:ring-secondary-300 border rounded-l-lg border-solid border-[#000449]/30 cursor-pointer flex-row gap-2 items-center bottom-0 h-10 bg-transparent text-white w-fit  py-1.5 px-2.5  text-left  sm:text-sm sm:leading-6"
          {...getToggleButtonProps()}
        >
          <img
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
            alt={`Flag of ${country}`}
            className="h-5 w-5"
          />
          <i
            aria-hidden="true"
            className={clsx(
              "i-fa6-solid-chevron-left bg-black w-2.5 h-2.5 transition",
              isOpen && "-rotate-90"
            )}
          />
        </div>
        <div className="w-full">
          <PhoneInput
            name={name as string}
            country={country}
            autoComplete="tel"
            errors={errors}
            international
            control={control}
            withCountryCallingCode
            inputComponent={InputBase}
            className="pl-[72px]"
            {...rest}
          />
        </div>
      </div>
      <div
        className="absolute top-full mt-1 z-30 w-full"
        {...getMenuProps()}
      >
        <DropdownContainer
          // width={dropdownWidth ? dropdownWidth : rect?.width}
          width={300}
          isOpen={isOpen}
          as="ul"
          ref={listRef}
        >
          <ul className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <li
                className={clsx(
                  highlightedIndex === virtualRow.index && "bg-zinc-100",
                  selectedItem === countryMapping[virtualRow.index] &&
                    "font-bold bg-zinc-50 hover:bg-zinc-100",
                  "px-3 cursor-pointer flex flex-row items-center gap-3 text-black/70 absolute top-0 left-0 w-full"
                )}
                key={countryMapping[virtualRow.index].id}
                {...getItemProps({
                  index: virtualRow.index,
                  item: countryMapping[virtualRow.index],
                })}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="w-6">
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${
                      countryMapping[virtualRow.index].value
                    }.svg`}
                    alt={`Flag of ${countryMapping[virtualRow.index].label}`}
                    className="h-6 w-6"
                  />
                </div>
                <div className="leading-snug w-[calc(100%-30px)] flex items-end  gap-1.5">
                  <span className="truncate text-[15px]">
                    {es[countryMapping[virtualRow.index].value as CountryCode]}
                  </span>
                  <span className="text-[#000449]/50 font-semibold leading-[18px] text-xs">
                    +
                    {getCountryCallingCode(
                      countryMapping[virtualRow.index].value as CountryCode
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </DropdownContainer>
      </div>
    </div>
  );
};
