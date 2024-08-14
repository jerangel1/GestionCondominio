import {
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from "react";
import { type FieldErrors } from "react-hook-form";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Label } from "../label";
import clsx from "clsx";
import { ErrorMessage } from "../ErrorMessage";

export const inputPrefixCva = cva(
  ["absolute", "h-fit", "left-2.5", "top-1/2", "-translate-y-1/2"],
  {
    variants: {
      size: {
        extrasmall: ["h-7", "py-1"],
        small: ["h-7", "py-1"],
        medium: ["h-9", "py-1.5"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const inputSuffixCva = cva(
  ["absolute", "h-fit", "right-3", "top-1/2", "-translate-y-1/2"],
  {
    variants: {
      size: {
        extrasmall: ["h-7", "py-1"],
        small: ["h-7", "py-1"],
        medium: ["h-9", "py-1.5"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const inputVariants = cva(
  [
    "border",
    "border-solid",
    "outline-0",
    "w-full",
    "p-2",
    "shadow-sm",
    "transition",
    "ring-0",
    "focus:ring-2",
    "focus:ring-secondary-300",
    "aria-[invalid=true]:ring-red-400",
    "disabled:bg-zinc-100",
    "disabled:opacity-70",
    "disabled:cursor-not-allowed",
    "read-only:bg-zinc-100",
    "read-only:focus:ring-0",
    "read-only:focus:ring-transparent",
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
      shape: {
        square: ["rounded-lg"],
        rounded: ["rounded-full"],
      },
      size: {
        extrasmall: ["text-sm", "py-1", "px-1.5", "h-7"],
        small: ["text-sm", "py-1", "px-2", "h-9"],
        medium: ["text-base", "py-2", "px-4", "h-10"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      shape: "square",
    },
  }
);

export type InputProps = {
  errors?: FieldErrors;
  label?: ReactNode;
  srOnly?: boolean;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
  customLabelClassName?: string;
  size?: "extrasmall" | "small" | "medium";
  isWrongNumber?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<VariantProps<typeof inputVariants>, "size">;

type NestedObject = { [key: string]: any };

export const getErrorMessage = (errors?: FieldErrors | undefined, name?: string) => {
  if (!errors || !name) return;

  const pathSegments = name.split(".");
  let currentObject: NestedObject | undefined = errors;
  for (const segment of pathSegments) {
    if (!currentObject) {
      return undefined;
    }
    currentObject = currentObject[segment];
  }
  return currentObject;
};

const InputBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      intent,
      size,
      shape,
      inputPrefix,
      inputSuffix,
      width,
      label,
      name,
      errors,
      isWrongNumber,
      customLabelClassName,
      srOnly,
      onClick,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const uniqueId = name + id;
    const uniqueErrorMessageId = uniqueId + "-errormessage";
    const errorMessage = getErrorMessage(errors, name);

    return (
      <div
        style={{ width: width ? `${width}px` : undefined }}
        className="flex w-full relative flex-col"
      >
        {label && (
          <Label
            aria-invalid={errors && name ? !!errorMessage : false}
            srOnly={srOnly}
            htmlFor={uniqueId}
            className={customLabelClassName}
          >
            {label as string}
          </Label>
        )}
        <div className="flex relative flex-row" onClick={onClick}>
          {inputPrefix && (
            <span className={inputPrefixCva({ size: size || null })}>
              {inputPrefix}
            </span>
          )}
          <input
            id={uniqueId}
            aria-errormessage={uniqueErrorMessageId}
            aria-invalid={errors && name ? !!errorMessage : false}
            className={inputVariants({
              intent,
              size,
              shape,
              className: clsx(className, {
                "pl-10": inputPrefix,
                "pr-10": inputSuffix,
                "text-red-600": isWrongNumber,
              }),
            })}
            name={name}
            ref={ref}
            {...props}
          />
          {inputSuffix && (
            <span className={inputSuffixCva({ size })}>{inputSuffix}</span>
          )}
        </div>
        {errorMessage && (
          <ErrorMessage errorMessageId={uniqueErrorMessageId} > 
            {errorMessage.message}
          </ErrorMessage>
        )}
      </div>
    );
  }
);

InputBase.displayName = "Input";
export const Input = InputBase;
