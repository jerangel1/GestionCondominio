import {
  type TextareaHTMLAttributes,
  type ReactNode,
  forwardRef,
  useId,
} from "react";
import { type FieldErrors } from "react-hook-form";
import { type VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Label } from "../label";
import clsx from "clsx";

export const TextareaPrefixCva = cva(
  ["absolute", "h-fit", "left-2.5", "top-1/2", "-translate-y-1/2"],
  {
    variants: {
      size: {
        small: ["h-7", "py-1"],
        medium: ["h-9", "py-1.5"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const TextareaSuffixCva = cva(
  ["absolute", "h-fit", "right-2.5", "top-1/2", "-translate-y-1/2"],
  {
    variants: {
      size: {
        small: ["h-7", "py-1"],
        medium: ["h-9", "py-1.5"],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

export const TextareaVariants = cva(
  [
    "border",
    "border-solid",
    "outline-0",
    "w-full",
    "p-2",
    "transition",
    "ring-0",
    "focus:ring-2",
    "focus:ring-secondary-300",
    "aria-[invalid=true]:ring-red-400",
    "disabled:bg-zinc-100",
    "disabled:opacity-70",
    "disabled:cursor-not-allowed",
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
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      shape: "square",
    },
  }
);

export type TextareaProps = {
  errors?: FieldErrors;
  label?: string;
  srOnly?: boolean;
  TextareaPrefix?: ReactNode;
  TextareaSuffix?: ReactNode;
  size?: "small" | "medium";
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  Omit<VariantProps<typeof TextareaVariants>, "size">;

const TextareaBase = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      intent,
      size,
      shape,
      TextareaPrefix,
      TextareaSuffix,
      label,
      name,
      errors,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const uniqueId = name + id;
    const uniqueErrorMessageId = uniqueId + "-errormessage";

    return (
      <div className="flex flex-col">
        {label && (
          <Label
            aria-invalid={errors && name ? !!errors[name] : false}
            htmlFor={uniqueId}
          >
            {label as string}
          </Label>
        )}
        <div className="flex relative flex-row">
          {TextareaPrefix && (
            <span className={TextareaPrefixCva({ size: size || null })}>{TextareaPrefix}</span>
          )}
          <textarea
            id={uniqueId}
            aria-errormessage={uniqueErrorMessageId}
            aria-invalid={errors && name ? !!errors[name] : false}
            className={TextareaVariants({
              intent,
              size,
              shape,
              className: clsx(className, {
                "pl-10": TextareaPrefix,
                "pr-10": TextareaSuffix,
              }),
            })}
            name={name}
            ref={ref}
            {...props}
          />
          {TextareaSuffix && (
            <span className={TextareaSuffixCva({ size })}>{TextareaSuffix}</span>
          )}
        </div>
        {errors && name && (
          <p
            id={uniqueErrorMessageId}
            className="text-red-600 text-sm mt-1 font-medium"
          >
            {errors[name]?.message?.toString()}
          </p>
        )}
      </div>
    );
  }
);

TextareaBase.displayName = "Textarea";
export const Textarea = TextareaBase;
