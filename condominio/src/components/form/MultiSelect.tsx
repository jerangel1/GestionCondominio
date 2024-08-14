import { type ReactNode, useState, useRef, useId, useEffect, useMemo } from "react";
import { Label } from "./label";
import { select } from "./styles";
import { type DEFAULT_OPTION, type SelectProps } from "./types";
import { DropdownContainer } from "./utils/DropdownContainer";
import clsx from "clsx";
import { ErrorMessage } from "./ErrorMessage";
import {
  type UseSelectState,
  type UseSelectStateChangeOptions,
  useSelect,
} from "downshift";
import { getErrorMessage } from "./input";
import { ChevronLeft } from "lucide-react";
import { useRect } from "@/hooks/useRect";

const MultipleStateReducer = <T extends DEFAULT_OPTION>(
  state: UseSelectState<T>,
  actionAndChanges: UseSelectStateChangeOptions<T>
) => {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
    case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
};

const MultipleSelectPlaceholder = <T extends DEFAULT_OPTION>({
  children,
  selectedItems,
}: {
  children: ReactNode;
  selectedItems: T[];
}) => {
  const [placeholderWidth, setPlaceholderWidth] = useState<number>(0);
  const [palceholderContentWidth, setPlaceholderContentWidth] =
    useState<number>(0);

  const placeholderRef = useRef<HTMLDivElement>(null);
  const placeholderContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!placeholderContentRef.current) return;

    setPlaceholderContentWidth(placeholderContentRef.current.offsetWidth);
  }, [placeholderContentRef, selectedItems]);

  useEffect(() => {
    if (!placeholderRef.current) return;

    setPlaceholderWidth(placeholderRef.current.offsetWidth);
  }, [placeholderRef, selectedItems]);

  return (
    <>
      <span ref={placeholderContentRef} className="overflow-hidden w-full">
        <span ref={placeholderRef}>{children}</span>
      </span>
      {placeholderRef.current &&
        placeholderContentRef.current &&
        placeholderWidth > palceholderContentWidth && (
          <>... ({selectedItems.length})</>
        )}
    </>
  );
};

export const MultipleSelect = <T extends DEFAULT_OPTION = DEFAULT_OPTION>({
  srOnly,
  errors,
  intent,
  size,
  name,
  value,
  label,
  shape,
  width,
  onChange,
  data = [],
  className,
  placeholder = "Seleccionar",
  dropdownWidth,
  getValueFn = (item) => {
    if (item) return item.value.toString();
    throw new Error("The item selected was not found");
  },
}: Omit<SelectProps<T>, "onChange" | "value"> & {
  onChange: ({ selectedItems }: { selectedItems: T[] }) => void;
  value: Readonly<(string | number)[] | undefined>;
}) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(
    value ? data.filter((item) => value.includes(item.id)) : []
  );
  const items = useMemo<T[]>(() => {
    return data ? data : [];
  }, [data]);

  const id = useId();
  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";
  const errorMessage = getErrorMessage(errors, name);
  const [rect ,ref] = useRect();

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<T>({
    items,
    itemToString: getValueFn,
    stateReducer: MultipleStateReducer<T>,
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }

      let index: number | undefined = undefined;
      selectedItems.forEach((item, itemIndex) => {
        if (item.id == selectedItem.id) index = itemIndex;
      });

      if (typeof index === "number" && index > 0) {
        const newItems = [
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ];
        setSelectedItems(newItems);
        onChange({ selectedItems: newItems });
      } else if (typeof index === "number" && index === 0) {
        const newItems = [...selectedItems.slice(1)];
        setSelectedItems(newItems);
        onChange({ selectedItems: newItems });
      } else {
        const newItems = [...selectedItems, selectedItem];
        setSelectedItems(newItems);
        onChange({ selectedItems: newItems });
      }
    },
  });

  const buttonText = selectedItems.length
    ? selectedItems.map((item) => item.value).join(", ")
    : placeholder;

  return (
    <div
      ref={ref}
      style={{ width: width ? `${width}px` : undefined }}
      className="w-full relative"
    >
      <div className="w-full flex flex-col">
        {label && (
          <Label srOnly={srOnly} {...getLabelProps()}>
            {label}
          </Label>
        )}
        <div
          className={select({ intent, size, className, shape })}
          {...getToggleButtonProps()}
        >
          <MultipleSelectPlaceholder selectedItems={selectedItems}>
            {buttonText}
          </MultipleSelectPlaceholder>
          <span className="bg-primary-50/60 absolute  top-1/2 right-4 -translate-y-1/2 rounded-full flex items-center justify-center p-0.5">
            <ChevronLeft className={clsx(
                "w-4 h-4 text-primary-950 transition duration-300",
                isOpen && "-rotate-90"
              )} 
            />
          </span>
        </div>
      </div>
      <div className="absolute mt-1 z-30 w-full" {...getMenuProps()}>
        <DropdownContainer 
          width={dropdownWidth ? dropdownWidth : rect?.width}
          isOpen={isOpen} 
          as="ul"
          >
          {items &&
            items.map((item, index) => {
              return (
                <li
                  className={clsx(
                    highlightedIndex === index && "bg-primary-50/40",
                    "py-2 select-none px-3 hover:cursor-pointer flex flex-row items-center gap-4"
                  )}
                  key={item.id}
                  {...getItemProps({
                    item,
                    index,
                    "aria-selected": !!selectedItems.filter(
                      (items) => items.id == item.id
                    )[0],
                  })}
                >
                  <label className="flex flex-row items-end no-select gap-2 pointer-events-none">
                    <input
                      id={index + "-" + item.value}
                      type="checkbox"
                      checked={
                        !!selectedItems.filter(
                          (items) => items.id == item.id
                        )[0]
                      }
                      value={item.id}
                      onChange={() => null}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm whitespace-nowrap text-gray-700">
                        {item.value}
                      </span>
                    </div>
                  </label>
                </li>
              );
            })}
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
