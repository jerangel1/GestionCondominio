import { useRef, ChangeEventHandler, useState } from "react";
import { format } from "date-fns";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { es } from "date-fns/locale";
import { type ClassNames, type DateAfter, DayPicker, type SelectSingleEventHandler } from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import { DropdownContainer } from "./utils/DropdownContainer";
import { isValid, parse } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui";
import { Input, InputProps } from "@/components/form/input";
const today = new Date();

const classNames: Partial<ClassNames> = {
  ...styles,
  head: "text-sm text-zinc-600 font-normal",
  table: "mt-2 border-spacing-0",
  cell: "text-sm ",
  months: "flex gap-4",
  month: "m-0",
  caption_label: "text-base capitalize font-medium",
  day_range_end: "!bg-secondary-200 scale-105 !rounded",
  day_range_start: "!bg-secondary-200 scale-105 !rounded",
  day_selected:
    "!bg-secondary-100 !border-l-0 border !border-r-0 !border !border-solid",
  day_outside: "opacity-30",
} as const;

export const RangeDateInput = ({
  width,
  onChange,
  errors,
  placeholder = "yyyy/mm/dd",
  onlyBefore = true,
  ...props
}: Omit<InputProps, "onChange"> & {
  onChange: (value: string) => void,
  onlyBefore?: boolean;
}) => {
  const [selected, setSelected] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [month, setMonth] = useState(today);
  const containerRef = useRef(null);

  const afterMatcher: DateAfter = { after: new Date() };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleReset = () => {
    setSelected(undefined);
    setInputValue("");
    if(onChange){
      onChange("");
    }
    closeModal();
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      if(onChange){
        onChange(format(date, "y-MM-dd") ?? undefined);
      }
      closeModal();
    } else {
      setInputValue("");
       if(onChange){
        onChange("");
      }
    }
  };

  const handleGoToday = () => {
    setMonth(today);
    setSelected(today);
    setInputValue(format(today, "y-MM-dd"));
    onChange(format(today, "y-MM-dd") ?? undefined);
  };

  const handleClickOutside = () => {
    if (!isOpen) return;
    closeModal();
  };

  useOnClickOutside(containerRef, handleClickOutside);

  return (
    <div
      style={{ width: width ? `${width}px` : undefined }}
      className="w-full relative"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleButtonClick}
        inputSuffix={<CalendarDays className="w-4 h-4 flex text-black/60" />}
        errors={errors}
        {...props}
      />
      <div className="absolute mt-1 z-50">
        <DropdownContainer isOpen={isOpen} as="div">
          <div ref={containerRef} className="z-20 rounded-md overflow-hidden bg-white transform lg:max-w-3xl">
            <div className="relative pb-2 gap-0 flex flex-col bg-white">
              <DayPicker
                id="test"
                month={month}
                onMonthChange={setMonth}
                components={{
                  IconLeft: () => <ChevronLeft className="w-5 h-5" />,
                  IconRight: () => <ChevronRight className="w-5 h-5" />,
                }}
                locale={es}
                showOutsideDays
                fixedWeeks
                disabled={onlyBefore && afterMatcher}
                classNames={classNames}
                mode="single"
                defaultMonth={selected}
                selected={selected}
                onSelect={handleDaySelect}
              />
              <div className="flex px-2 flex-row justify-between">
                <Button
                  type="button"
                  onClick={handleReset}
                  disabled={!selected}
                  size="extraSmall"
                  variant="text"
                >
                  Borrar Selección
                </Button>
                <Button
                  type="button"
                  onClick={handleGoToday}
                  disabled={selected?.toDateString() == today.toDateString()}
                  size="extraSmall"
                  variant="filled"
                >
                  Hoy
                </Button>
              </div>
            </div>
          </div>
        </DropdownContainer>
      </div>
    </div>
  );
};
