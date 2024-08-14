import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Loader from "../loaders/Loader";

const buttonVariants = cva(
  "inline-flex data-[loading='true']:brightness-90 relative gap-3 cursor-pointer disabled:brightness-90 disabled:cursor-not-allowed transition items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      color: {
        primary: ["bg-secondary-1000", "text-white", "border-primary-1000"],
        secondary: [
          "border-[#000449]/30",
          "text-primary-450",
          "border-secondary-950",
        ],
        success: ["bg-green-600", "text-white", "border-green-600"],
        error: ["bg-red-600", "text-white", "border-red-600"],
        landing: [
          "bg-LandingBlue",
          "text-white",
          "border-LandingBlue",
          "hover:bg-LandingBlue/60",
        ],
      },
      shape: {
        square: ["rounded-md"],
        rounded: ["rounded-full"],
      },
      variant: {
        filled: ["shadow", "border-none", "hover:brightness-95"],
        outline: [
          "border",
          "border-solid",
          "!text-black",
          "!bg-transparent",
          "hover:!bg-zinc-100/80",
        ],
        text: [
          "bg-transparent",
          "border-transparent",
          "!text-secondary-950",
          "border-solid",
          "hover:border-zinc-100/80",
          "hover:bg-zinc-100/80",
        ],
      },
      size: {
        extraSmall: "h-8 px-4 py-2 text-sm",
        small: "h-9 px-4 py-2 text-sm",
        medium: "h-10 px-5 text-base",
        large: "h-12 px-8 text-large",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "medium",
      shape: "square",
    },
  }
);

export type ButtonProps = {
  width?: number;
  isLoading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      isLoading,
      width,
      shape,
      disabled,
      size,
      asChild = false,
      color,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        style={{ width: width ? `${width}px` : undefined }}
        className={clsx(
          buttonVariants({ variant, size, shape, color, className }),
          typeof isLoading != "undefined" && "px-8"
        )}
        data-loading={isLoading}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <Loader className="w-4 h-fit inline-flex absolute left-2 top-1/2 -translate-y-1/2" />
        ) : null}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
export { Button, buttonVariants };
