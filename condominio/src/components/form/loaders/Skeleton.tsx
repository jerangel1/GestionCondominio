import { type HTMLAttributes } from "react";
import clsx from "clsx";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-zinc-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
