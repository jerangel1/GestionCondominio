import { useId, useMemo } from "react";
import { useSelect } from "downshift";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Label } from "./label";
import { DropdownContainer } from "./utils/DropdownContainer";
import { ErrorMessage } from "./ErrorMessage";
import { getErrorMessage } from "./input";
import { Check, ChevronLeft } from "lucide-react";
import { useRect } from "@/hooks/useRect";
import { SelectProps } from "./types";

const select = cva(
  [
    "border",
    "border-solid",
    "outline-0",
    "p-2",
    "bg-white",
    "relative",
    "aria-disabled:bg-zinc-100",
    "aria-disabled:opacity-70",
    "aria-disabled:cursor-not-allowed",
    "aria-disabled:pointer-events-none",
    "aria-[invalid=true]:ring-red-400",
    "flex",
    "justify-between",
    "items-center",
    "cursor-pointer",
    "ring-0",
    "focus:ring-2",
    "focus:ring-secondary-300",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-white",
          "text-gray-900",
          "border-[#000449]/30",
          "aria-[invalid=true]:border-red-600",
        ],
        secondary: ["bg-white", "text-gray-800", "border-gray-400"],
      },
      size: {
        small: ["text-sm", "py-2", "px-2.5", "h-9"],
        medium: ["text-[15px]", "py-2", "px-4", "h-10"],
      },
      shape: {
        square: ["rounded-lg"],
        rounded: ["rounded-full"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        size: "medium",
        className: "",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
      shape: "square",
    },
  }
);

export type DEFAULT_OPTION = {
  label?: string;
  id: string | number;
  value: string | number;
  [key: string]: string | number | boolean | undefined | string[];
};

const findObjectById = <T extends DEFAULT_OPTION>(
  id: number | string | undefined | readonly string[] | null,
  objects: T[] | undefined
): T | undefined => {
  const default_option = { id: 0, value: "Seleccionar" } as T;

  if (objects && id) {
    return objects.find((object) => object.id === id) ?? default_option;
  }

  return default_option;
};

const RESET_ID = "id-reset";

const appendResetOption = <T extends DEFAULT_OPTION>(
  data: T[] | undefined,
  placeholder: string
): T[] => {
  const resetOption = {
    id: RESET_ID,
    value: placeholder,
  } as T;

  return Array.isArray(data) ? [resetOption, ...data] : [resetOption];
};

const SelectBase = <T extends DEFAULT_OPTION = DEFAULT_OPTION>({
  srOnly,
  errors,
  intent,
  size,
  name,
  value,
  disabled,
  label,
  shape,
  width,
  onChange,
  accessKey = "value",
  required = false,
  data = [],
  className,
  placeholder = "Seleccionar",
  dropdownWidth,
  getValueFn = (item) => {
    if (item) return item.value.toString();
    throw new Error("The item selected was not found");
  },
}: SelectProps<T>) => {
  const id = useId();
  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";
  const errorMessage = getErrorMessage(errors, name);
  
  const memoizedItems = useMemo(() => {
    return !required ? appendResetOption(data, placeholder) : data;
  }, [data, placeholder, required]);

  const {
    isOpen,
    selectedItem,
    reset,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    id: uniqueId,
    labelId: uniqueId,
    menuId: uniqueId,
    toggleButtonId: uniqueId,
    selectedItem: findObjectById<T>(value, memoizedItems),
    items: memoizedItems,
    itemToString: getValueFn,
    onSelectedItemChange: (item) => {
      const selectedItem = item.selectedItem;
      onChange(
        selectedItem && selectedItem.id !== RESET_ID
          ? selectedItem
          : ({ id: "", value: "", label: "" } as T)
      );
    },
  });

  const [rect, ref] = useRect([isOpen]);

  return (
    <div
      ref={ref}
      style={{ width: width ? `${width}px` : "100%" }}
      className="w-full relative"
    >
      <div className="flex flex-col">
        {label && (
          <Label
            srOnly={srOnly}
            {...getLabelProps({
              "aria-invalid": errors && name ? !!errorMessage : false,
            })}
          >
            {label}
          </Label>
        )}
        <div
          className={clsx(
            select({ intent, size, className, shape }),
            disabled || (data && data.length === 0)
              ? "bg-gray-200/70 text-gray-200"
              : ""
          )}
          aria-invalid={errors && name ? !!errorMessage : false}
          aria-disabled={disabled || (data && data.length === 0)}
          {...getToggleButtonProps({
            onClick: (event) => event.preventDefault(),
          })}
        >
          <span>
            {selectedItem ? (selectedItem[accessKey] as string) : placeholder}
          </span>
          <span className="bg-primary-50/60 rounded-full absolute top-1/2 right-2 transform -translate-y-1/2 flex items-center justify-center p-0.5">
            <ChevronLeft
              className={clsx(
                "w-4 h-4 text-primary-950 transition duration-300",
                isOpen && "-rotate-90"
              )}
            />
          </span>
        </div>
      </div>
      <div
        id={uniqueId}
        className="absolute mt-1 z-30 w-full"
        {...getMenuProps()}
      >
        <DropdownContainer
          width={dropdownWidth ? dropdownWidth : rect?.width}
          isOpen={isOpen}
          as="ul"
        >
          {memoizedItems ? (
            <>
              {memoizedItems.map((item, index) => (
                <li
                  className={clsx(
                    highlightedIndex === index && "bg-primary-50/40",
                    selectedItem === item && "!bg-primary-50",
                    selectedItem &&
                      !selectedItem.id &&
                      item.id === RESET_ID &&
                      "!bg-primary-50",
                    "py-2 select-none px-3 text-sm text-gray-700 cursor-pointer flex flex-row items-center justify-between"
                  )}
                  onClick={item.id === RESET_ID ? () => reset() : undefined}
                  key={item.id}
                  {...getItemProps({ item, index })}
                >
                  <span>{item[accessKey] as string}</span>
                  {(selectedItem === item ||
                    (selectedItem &&
                      !selectedItem.id &&
                      item.id === RESET_ID)) && (
                    <Check className="w-4 h-5 flex items-center justify-center"/>
                  )}
                </li>
              ))}
            </>
          ) : (
            <span className="py-2 px-3 text-sm text-gray-700">
              No se encontraron datos
            </span>
          )}
        </DropdownContainer>
      </div>
      {errorMessage ? (
        <ErrorMessage errorMessageId={uniqueErrorMessageId}>
          {errorMessage.message}
        </ErrorMessage>
      ) : null}
    </div>
  );
};

const Select = Object.assign(SelectBase, {
  displayName: "Select",
});

export { Select };

