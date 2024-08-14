import {
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Input, InputProps } from "@/components/form";
import { format } from "date-fns";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { es } from "date-fns/locale";

import {
  type ClassNames,
  type SelectRangeEventHandler,
  DateAfter,
  DayPicker,
} from "react-day-picker";
import styles from "react-day-picker/dist/style.module.css";
import { DropdownContainer } from "./utils/DropdownContainer";
import { addDays, addMonths, addYears } from "date-fns";
import { DateRange } from "react-day-picker";
import clsx from "clsx";
import {
  ArrowUpLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui";

const today = new Date();

type optionsIds =
  | "TODAY"
  | "THREE_DAYS"
  | "WEEK"
  | "MONTH"
  | "THREE_MONTHS"
  | "YEAR"
  | "FIVE_YEARS"
  | "CUSTOM";

type dateOptionType = {
  id: optionsIds;
  label: string;
  dateOption?: () => DateRange;
};

type FormattedDate = {
  short: string;
  long: string;
  standar: string;
};

const dateOptions: dateOptionType[] = [
  {
    id: "TODAY",
    label: "Hoy",
    dateOption: () => ({
      from: today,
      to: undefined,
    }),
  },
  {
    id: "THREE_DAYS",
    label: "Tres días",
    dateOption: () => ({
      from: addDays(today, -2),
      to: today,
    }),
  },
  {
    id: "WEEK",
    label: "Una semana",
    dateOption: () => ({
      from: addDays(today, -6),
      to: today,
    }),
  },
  {
    id: "MONTH",
    label: "Un Mes",
    dateOption: () => ({
      from: addMonths(today, -1),
      to: today,
    }),
  },
  {
    id: "THREE_MONTHS",
    label: "Tres meses",
    dateOption: () => ({
      from: addMonths(today, -3),
      to: today,
    }),
  },
  {
    id: "YEAR",
    label: "Un Año",
    dateOption: () => ({
      from: addYears(today, -1),
      to: today,
    }),
  },
  {
    id: "FIVE_YEARS",
    label: "Cinco Años",
    dateOption: () => ({
      from: addYears(today, -5),
      to: today,
    }),
  },
];

const classNames: ClassNames = {
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

export const RangeDayInput = ({
  value,
  width,
  onChange,
  errors,
  placeholder = "yy mm dd - yy mm dd",
  onlyBefore = true,
  ...props
}: Omit<InputProps, "onChange" | "value"> & {
  onChange?: (data: {
    dateRange?: DateRange;
    formattedFromDate?: FormattedDate;
    formattedToDate?: FormattedDate;
  }) => void;
  value?: DateRange;
  onlyBefore?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<optionsIds>();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const containerRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    value
  );
  const [month, setMonth] = useState(today);

  const closeModal = () => {
    setIsOpen(false);
    buttonRef?.current?.focus();
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleRangeSelect: SelectRangeEventHandler = (date) => {
    setSelectedOptionId(date ? "CUSTOM" : undefined);
    setSelectedRange(date);
  };

  const handleReset = () => {
    setSelectedRange(undefined);
    setSelectedOptionId(undefined);
  };

  const handleGoToDate = (date: Date) => {
    setMonth(date);
  };

  const handleClickOutside = () => {
    if (!isOpen) return;
    closeModal();
  };

  const handleSetRange = (option: dateOptionType) => {
    if (!option.dateOption) return;
    setSelectedRange(option.dateOption());
    setSelectedOptionId(option.id);
  };

  const afterMatcher: DateAfter = { after: new Date() };

  const formattedToDate = useMemo(() => {
    const toDate = selectedRange?.to;
    return toDate
      ? {
          short: format(toDate, "yy MMM dd", {
            locale: es,
          }),
          long: format(toDate, "yyyy MMMM dd", {
            locale: es,
          }),
          standar: format(toDate, "yyyy-MM-dd"),
        }
      : undefined;
  }, [selectedRange]);

  const formattedFromDate = useMemo(() => {
    const fromDate = selectedRange?.from;
    return fromDate
      ? {
          short: format(fromDate, "yy MMM dd", {
            locale: es,
          }),
          long: format(fromDate, "yyyy MMMM dd", {
            locale: es,
          }),
          standar: format(fromDate, "yyyy-MM-dd"),
        }
      : undefined;
  }, [selectedRange]);

  useEffect(() => {
    if (!onChange) return;

    onChange({
      dateRange: selectedRange,
      formattedFromDate: formattedFromDate,
      formattedToDate: formattedToDate,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedFromDate, formattedToDate]);

  useEffect(() => {
    setSelectedRange(value);
  }, [value]);

  useEffect(() => {
    const dates = [];

    if (formattedFromDate) {
      dates.push(formattedFromDate.short);
    }

    if (formattedToDate) {
      dates.push(formattedToDate.short);
    }

    setInputValue(dates.join(" - "));
  }, [formattedFromDate, formattedToDate]);

  useOnClickOutside(containerRef, handleClickOutside);

  return (
    <div className="relative">
      <Input
        width={width}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        inputSuffix={<CalendarDays className="w-4 h-4 flex text-black/60" />}
        onClick={handleButtonClick}
        errors={errors}
        {...props}
        className="cursor-pointer"
      />
      <div className="absolute mt-1 z-50">
        <DropdownContainer
          ref={containerRef}
          width={815}
          isOpen={isOpen}
          as="div"
        >
          <div
            ref={containerRef}
            className="z-20 w-full flex flex-row rounded-md bg-white transform"
          >
            <div className="flex flex-row !w-[1200px] !max-w-[1200px] ">
              <div className="flex justify-between border-solid border-zinc-200 border border-y-0 border-l-0 w-48 px-2 py-2 bg-gray-50/60 flex-col">
                <ul>
                  {dateOptions.map((option) => (
                    <li className="list-none" key={option.label}>
                      <button
                        type="button"
                        className={clsx(
                          "cursor-pointer rounded-md px-2 w-full flex border-none bg-transparent text-sm py-2",
                          selectedOptionId == option.id
                            ? "bg-zinc-200/80"
                            : "hover:bg-zinc-100"
                        )}
                        onClick={() => {
                          handleSetRange(option);
                          if (option.id === "TODAY") {
                            setMonth(today);
                          }
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-1 border-zinc-200 border-solid border-x-0 border-b-0">
                  <div
                    className={clsx(
                      "rounded-md px-3 w-full flex bg-transparent text-sm py-2",
                      selectedOptionId == "CUSTOM" && "bg-zinc-200/80"
                    )}
                  >
                    Rango Personalizado
                  </div>
                </div>
              </div>
              <div className="relative py-2 bg-white">
                <DayPicker
                  components={{
                    IconLeft: () => <ChevronLeft className="w-5 h-5" />,
                    IconRight: () => <ChevronRight className="w-5 h-5" />,
                  }}
                  className="!flex !flex-row !gap-2"
                  modifiers={
                    selectedRange && {
                      selected: selectedRange,
                    }
                  }
                  month={month}
                  onMonthChange={setMonth}
                  disabled={onlyBefore && afterMatcher}
                  showOutsideDays
                  fixedWeeks
                  pagedNavigation
                  id="test"
                  locale={es}
                  classNames={classNames}
                  mode="range"
                  selected={selectedRange}
                  numberOfMonths={2}
                  onSelect={handleRangeSelect}
                />
                <div className="flex pl-3 flex-row justify-between">
                  <Button
                    onClick={handleReset}
                    disabled={!selectedOptionId}
                    size="small"
                    variant="text"
                  >
                    Borrar Selección
                  </Button>
                  <div className="grid text-sm w-96 items-center justify-end ml-auto grid-cols-[1fr_0.25rem_1fr] gap-2">
                    <div
                      onClick={() => {
                        if (!formattedFromDate?.long || !selectedRange?.from)
                          return;
                        handleGoToDate(selectedRange?.from);
                      }}
                      data-selected={!!selectedRange?.from}
                      className="border data-[selected='true']:cursor-pointer relative group justify-between border-zinc-200 px-4 h-9 flex items-center border-solid rounded-md"
                    >
                      {formattedFromDate?.long && (
                        <>
                          <span>{formattedFromDate.long}</span>
                          <ArrowUpLeft className="w-4 absolute duration-300 top-1/2 -translate-y-1/2 right-2 text-black/80  group-hover:opacity-100 opacity-0 transition h-4 text" />
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-center">-</div>
                    <div
                      onClick={() => {
                        if (!formattedToDate?.long || !selectedRange?.to)
                          return;
                        handleGoToDate(selectedRange?.to);
                      }}
                      data-selected={!!selectedRange?.to}
                      className="border data-[selected='true']:cursor-pointer relative group border-zinc-200 px-4 h-9 flex justify-between items-center border-solid rounded-md"
                    >
                      {formattedToDate?.long && (
                        <>
                          <span>{formattedToDate.long}</span>
                          <ArrowUpLeft className="w-4 absolute top-1/2 -translate-y-1/2 right-2 text-black/80 group-hover:opacity-100 opacity-0 duration-300 transition h-4 text" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownContainer>
      </div>
    </div>
  );
};
