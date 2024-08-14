/* eslint-disable indent */
import { type InputHTMLAttributes, useId } from "react";
import { type FieldError } from "react-hook-form";
import { type VariantProps, cva } from "class-variance-authority";
import { Label } from "@/components/form/label";
import { useQuery } from "@tanstack/react-query";
import { useSelect } from "downshift";
import clsx from "clsx";

const select = cva(
  [
    "border",
    "border-solid",
    "outline-0",
    "p-2",
    "bg-white",
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
        primary: ["bg-white", "text-gray-900", "border-[#000449]/30"],
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
  label: string;
  id: string | number;
  value: string | number;
};

function findObjectById<T extends DEFAULT_OPTION>(
  id: number | string | undefined | readonly string[],
  objects: T[] | undefined
): T | undefined {
  const default_option = { id: 0, value: "Seleccionar" } as T;

  if (objects && id && typeof id === "number") {
    return objects.find((object) => object.id === id) ?? default_option;
  }

  return default_option;
}

export type SelectProps<T extends object = DEFAULT_OPTION> = {
  error?: FieldError;
  label: string;
  srOnly?: boolean;
  name: string;
  accessKey?: keyof T;
  queryFn: () => Promise<T[]>;
  queryKey: string[];
  width?: number;
  onChange: (obj: T) => void;
  data?: T[];
  getValueFn?: (option: T | null) => string;
} & Omit<InputHTMLAttributes<HTMLSelectElement>, "name" | "onChange" | "size"> &
  VariantProps<typeof select>;

const SelectBase = ({
  srOnly,
  error,
  intent,
  size,
  name,
  value,
  label,
  shape,
  width,
  onChange,
  accessKey = "value",
  queryFn,
  queryKey,
  className,
  placeholder,
  getValueFn = (item) => {
    if (item) return item.value.toString();
    throw new Error("The item selected was not found");
  },
}: SelectProps) => {
  const id = useId();
  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
    selectedItem: value ? findObjectById(value, data) : undefined,
    items: data ?? [],
    itemToString: getValueFn,
    onSelectedItemChange: (item) => {
      const selectedItem = item.selectedItem;
      onChange(selectedItem);
    },
  });

  return (
    <div
      style={{
        width: width ? `${width}px` : undefined,
      }}
      className="w-full relative"
    >
      <div className="flex flex-col">
        <Label srOnly={srOnly} {...getLabelProps()}>
          {label}
        </Label>
        <div
          className={select({ intent, size, className, shape })}
          {...getToggleButtonProps()}
        >
          <span>{selectedItem ? selectedItem[accessKey] : placeholder}</span>
          <span
            className={clsx(
              "i-fa6-solid-chevron-left w-3.5 h-3.5 transition",
              isOpen && "-rotate-90"
            )}
          />
        </div>
      </div>
      <ul
        className={`absolute w-full z-30  bg-white border-zinc-300 border border-solid rounded-lg shadow-lg max-h-80 overflow-scroll p-0 ${!isOpen && "hidden"
          }`}
        {...getMenuProps()}
      >
        {isOpen && (
          <>
            {data && !isLoading ? (
              <>
                <li
                  className={clsx(
                    "py-2 px-3 shadow-sm hover:cursor-pointer flex flex-row items-center justify-between"
                  )}
                  onClick={() => reset()}
                >
                  <span className="text-sm text-gray-700">
                    {placeholder ?? "selecionar"}
                  </span>
                </li>
                {data.map((item, index) => (
                  <li
                    className={clsx(
                      highlightedIndex === index && "bg-blue-300",
                      selectedItem === item && "font-bold",
                      "py-2 px-3 shadow-sm hover:cursor-pointer flex flex-row items-center justify-between"
                    )}
                    key={index} // Añade esta línea
                    {...getItemProps({ item, index })}
                  >
                    <span className="text-sm text-gray-700">
                      {item[accessKey]}
                    </span>
                    {selectedItem === item && (
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    )}
                  </li>
                ))}
              </>
            ) : (
              <>Cargando...</>
            )}
          </>
        )}
      </ul>
      {error && <p id={uniqueErrorMessageId}>{error.message}</p>}
    </div>
  );
};

SelectBase.displayName = "Select";
export const Select = SelectBase;