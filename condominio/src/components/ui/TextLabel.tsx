import { type ReactNode } from "react";
import { Skeleton } from "../loaders/skeleton";
import clsx from "clsx";

export function TextLabel({
  children,
  isLoading,
  label,
  vertical = false,
  separator = ":",
}: {
  children: ReactNode;
  label?: string;
  isLoading?: boolean;
  vertical?: boolean;
  separator?: string;
}) {
  if (isLoading) {
    return <Skeleton className={"even:w-1/2 odd:w-2/5 h-5"} />;
  }

  return children ? (
    <div className={clsx("flex  gap-2", vertical ? "flex-col" : "flex-row")}>
      <span className="font-medium">
        {label}
        {separator}
      </span>
      <span className="capitalize">{children}</span>
    </div>
  ) : null;
}
