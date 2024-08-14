import React from "react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import { DropdownContainer } from "./utils/DropdownContainer";
import { useState, useId, useRef, useCallback, useEffect } from "react";
import { Label } from "./label";
import { DEFAULT_OPTION, SelectProps } from "./types";
import { ErrorMessage } from "./ErrorMessage";
import { select } from "./styles";
import { getErrorMessage } from "./input";
import { useRect } from "@/hooks/useRect";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounce } from "use-debounce";
import { ChevronLeft } from "lucide-react";

export const Combobox = <T extends DEFAULT_OPTION = DEFAULT_OPTION>({
  renderItem = (item) => item.value,
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
  dropdownWidth,
  onChange,
  onBottomReached,
  onValueChange,
  totalDBRowCount,
  totalFetched,
  isFetching,
  data = [],
  className,
  placeholder = "Buscar",
  getValueFn = (item) => {
    if (item) return item.value.toString();
    throw new Error("The item selected was not found");
  },
}: Omit<SelectProps<T>, "onChange"> & {
  onChange: ({
    id,
    selectedItem,
  }: {
    id: number | string;
    selectedItem: T;
  }) => void;
  dropdownPlacerholder?: string,
  onBottomReached: () => void,
  onValueChange: ({inputValue}:{inputValue: string | null}) => void,
  totalDBRowCount: number;
  totalFetched: number;
  isFetching: boolean;
  renderItem?: (item: T) => React.ReactNode;
}) => {
  const id = useId();
  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";

  const [text, setText] = useState<string | null>(null);
  const [search] = useDebounce(text, 300);

  const [itemsList, setItemsList] = useState<T[]>(data);
  const drowdownContainerRef = useRef<HTMLDivElement>(null);
  const errorMessage = getErrorMessage(errors, name);
  const [rect, ref] = useRect();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setText(inputValue);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!onChange) return;
      onChange({
        id: selectedItem.id,
        selectedItem,
      });
    },
    items: itemsList,
    itemToString: getValueFn,
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          onBottomReached();
        }
      }
    },
    [onBottomReached, isFetching, totalFetched, totalDBRowCount]
  );

  useEffect(() => {
    if (drowdownContainerRef) {
      fetchMoreOnBottomReached(drowdownContainerRef.current);
    }
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    onValueChange({ inputValue: search});
  }, [onValueChange, search]);

  useEffect(() => {
    if (value && text == null) {
      const selectedElement = itemsList.filter(item => {
        return item.id === value;
      })[0];

      if(selectedElement){
        setText(selectedElement.value as string);
      }
    }
  }, [itemsList, text, value]);

  useEffect(() => {
    if(value === null){
      setText(null);
    }
  }, [value]);

  useEffect(() => {
    setItemsList(data);
  }, [data]);

  return (
    <div
      ref={ref}
      className="w-full relative"
      style={{ width: width ? `${width}px` : undefined }}
    >
      <div className="flex flex-col ">
        <Label srOnly={srOnly} {...getLabelProps()}>
          {label}
        </Label>
        <div className="w-full relative cursor-pointer" >
          <input
            aria-disabled={disabled || 
              (typeof totalDBRowCount != "undefined" && totalDBRowCount === 0 && text === null)}
            aria-invalid={errors && name ? !!errors[name] : false}
            className={select({
              intent,
              size,
              className,
              shape,
            })}
            {...getInputProps({
              onChange: e => setText((e.target as HTMLInputElement).value ),
              value: text ? text : "",
              placeholder: placeholder
            })}
          />
          <button
            type="button"
            aria-label="Abrir/Cerrar Campo"
            className="bg-primary-50/60 absolute border-none top-1/2 right-4 cursor-pointer -translate-y-1/2 rounded-full flex items-center justify-center p-0.5"
            {...getToggleButtonProps()}
          >
            <ChevronLeft
              aria-hidden
              className={clsx(
                "w-4 h-4 text-primary-950 transition duration-300",
                isOpen && "-rotate-90"
              )}
            />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          "absolute mt-1 z-30 w-full"
        )}
        {...getMenuProps()}
      >
        <DropdownContainer
          width={dropdownWidth ? dropdownWidth : rect?.width}
          ref={drowdownContainerRef}
          onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
          isOpen={isOpen}
          className={className}
          as="div"
        >
          <>
          <ul className={clsx(isFetching && "opacity-50")}>
          {itemsList ? (
            itemsList.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index && "bg-primary-50/40",
                  selectedItem === item && "!bg-primary-50",
                  "py-2 select-none text-sm text-gray-700 px-3 hover:cursor-pointer flex flex-row items-center gap-2"
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <MagnifyingGlassIcon className="w-3.5 h-3.5" />
                <span>{renderItem(item)}</span>
              </li>
            ))
          ) : (
            <></>
          )}
          {itemsList && itemsList.length === 0 ? (
            <li className="py-2 select-none text-sm text-gray-700 px-3 hover:cursor-pointer flex flex-row items-center gap-4">
              <span>No hay Coincidencia</span>
            </li>
          ) : (
            <></>
          )}
          </ul>
          </>
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
