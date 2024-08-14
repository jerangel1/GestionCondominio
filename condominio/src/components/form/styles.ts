import { cva } from "class-variance-authority";

export const select = cva(
  [
    "border",
    "border-solid",
    "outline-0",
    "shadow-sm",
    "relative",
    "w-full",
    "py-2",
    "pl-3",
    "pr-[44px]",
    "bg-white",
    "transition",
    "aria-disabled:bg-zinc-100",
    "aria-disabled:opacity-70",
    "aria-disabled:cursor-not-allowed",
    "aria-disabled:pointer-events-none",
    "aria-[invalid=true]:ring-red-400",
    "flex",
    "gap-0.5",
    "whitespace-nowrap",
    "items-center",
    "cursor-pointer",
    "ring-0",
    "focus:ring-2",
    "focus:ring-primary-200",
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
