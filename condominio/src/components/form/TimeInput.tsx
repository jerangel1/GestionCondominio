import { useId } from "react";
import TimePicker from "react-time-picker";
import { getErrorMessage, type InputProps, inputVariants } from "./input";
import { Label } from "./label";
import { ErrorMessage } from "./ErrorMessage";
import {
  type Value,
  type LooseValue,
} from "react-time-picker/dist/cjs/shared/types";

export const TimeInput = ({
  className,
  intent,
  size,
  shape,
  onChange,
  label,
  value,
  name,
  errors,
}: Omit<InputProps, "value" | "inputPrefix" | "inputSuffix" | "onChange"> & {
  value: LooseValue;
  onChange: (value: Value) => void;
}) => {
  const id = useId();
  const uniqueId = name + id;
  const uniqueErrorMessageId = uniqueId + "-errormessage";
  const errorMessage = getErrorMessage(errors, name);
  
  return (
    <div className="flex w-full relative flex-col">
      {label && (
        <Label
          aria-invalid={errors && name ? !!errors[name] : false}
          htmlFor={uniqueId}
        >
          {label as string}
        </Label>
      )}
      <div className="flex flex-col">
        <TimePicker
          locale="es"
          name={name}
          maxDetail="second"
          format="HH:mm:ss"
          clearIcon={null}
          className={inputVariants({
            intent,
            size,
            shape,
            className: "read-only:bg-white",
          })}
          disabled={false}
          value={value ?? ""}
          onChange={onChange}
          disableClock={true}
        />
      </div>
      {errorMessage ? (
        <ErrorMessage errorMessageId={uniqueErrorMessageId}>
          {errorMessage.message}
        </ErrorMessage>
      ) : null}
    </div>
  );
};
