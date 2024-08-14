import React, { type LabelHTMLAttributes } from "react";
import clsx from "clsx";

type LabelProps = {
  children: React.ReactNode;
  "aria-invalid"?: boolean;
  srOnly?: boolean;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "children" | "aria-invalid">;

export const Label = ({ srOnly = false, className, ...props }: LabelProps) => (
  <label
    className={
      !srOnly
        ? clsx(
            "font-medium mb-1 aria-[invalid=true]:text-red-600 text-sm text-zinc-900",
            className
          )
        : "sr-only"
    }
    {...props}
  />
);
