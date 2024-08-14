import { forwardRef, ReactNode, type HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

type Status =
  | "DELETED"
  | "ABLE"
  | "DISABLED"
  | "CLOSED"
  | "DRAW"
  | "BLOCKED"
  | "APPROVED"
  | "ANNULLED"
  | "WINNER"
  | "DECLINED"
  | "PENDING"
  | "ENDED"
  | "PAYMENT"
  | "REJECTED"
  | "CURRENT";

// TO-DO: ADD THE REST OF THE STATUS COLORS
const badgeVariants = cva(
  "inline-flex whitespace-nowrap items-center gap-2 leading-5 capitalize rounded-full font-semibold",
  {
    variants: {
      status: {
        DELETED: ["bg-[#FCE9E9]", "text-[#E52727]"],
        ABLE: ["bg-[#D1FADF]", "text-[#027A48]"],
        DISABLED: ["bg-[#FCE9E9]", "text-[#E52727]"],
        CLOSED: ["bg-[#ffebdb]", "text-[#db6809]"],
        BLOCKED: ["", ""],
        REJECTED: ["bg-[#FCE9E9]", "text-[#E52727]"], 
        DRAW: ["bg-[#FFF1C2]", "text-[#F89500]"],
        APPROVED: ["bg-[#def8dc]", "text-[#027A48]"],
        DECLINED: ["bg-[#FCE9E9]", "text-[#E52727]"],
        CURRENT: ["bg-[#D1FADF]", "text-[#027A48]"],
        ENDED: ["bg-[#FCE9E9]", "text-[#E52727]"],
        PENDING: ["bg-[#e7f9ff]", "text-[#4e95ad]"],
        DEFAULT: ["bg-transparent", "text-black/80"],
        ANNULLED: ["bg-[#FCE9E9]", "text-[#E52727]"],
        WINNER: ["bg-[#D1FADF]", "text-[#027A48]"],
        PAYMENT: ["bg-[#FCE9E9]", "text-[#E52727]"]
      },
      size: {
        small: "px-3 h-6 text-xs",
        medium: "px-3.5 h-7 text-[13px]",
        large: "px-4 h-10 text-sm",
      },
    },
    defaultVariants: {
      status: "DEFAULT",
      size: "medium",
    },
  }
);

const statusTextObj: Record<Status, string> = {
  ABLE: "Habilitado",
  DELETED: "Eliminado",
  DISABLED: "Deshabilitado",
  CLOSED: "Cerrado",
  BLOCKED: "Bloqueado",
  PENDING: "En proceso",
  APPROVED: "Aprobado",
  ANNULLED: "Anulado",
  DRAW: "Borrador",
  WINNER: "Premiado",
  REJECTED: "Rechazado",
  DECLINED: "Rechazado",
  ENDED: "Finalizado",
  CURRENT: "En Curso",
  PAYMENT: "Pagado"
};

const standaredStatusObj: Record<string, Status | undefined> = {
  0: "DELETED",
  1: "ABLE",
  2: "DISABLED",
  3: "CLOSED",
  4: "BLOCKED",
  eliminado: "DELETED",
  habilitado: "ABLE",
  deshabilitado: "DISABLED",
  cerrado: "CLOSED",
  borrador: "DRAW",
  bloqueado: "BLOCKED",
  "en proceso": "PENDING",
  "premiado": "WINNER",
  PENDIENTE: "PENDING",
  pendiente: "PENDING",
  APROBADO: "APPROVED",
  aprobado: "APPROVED",
  rechazado: "DECLINED",
  pagado: "PAYMENT",
  "en curso": "CURRENT",
  finalizado: "ENDED"
};

export type BadgeProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> &
  Omit<VariantProps<typeof badgeVariants>, "status"> & {
    asChild?: boolean;
    status?: string | number;
    IconLeft?: ReactNode;
    IconRight?: ReactNode;
    icon?: boolean;
    hiddenText?: boolean;
    text?: string; 
  };

const getStandarStatus = (
  noStandarStatus: string | number
): Status | undefined =>
  standaredStatusObj[
    typeof noStandarStatus === "string"
      ? noStandarStatus.toLowerCase()
      : noStandarStatus
  ];


  const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
      { className, status: noStandarStatus, icon, IconLeft, IconRight, size, hiddenText=false, asChild = false, text, ...props },
      ref
    ) => {
      const standarStatuses = Object.keys(statusTextObj);
      let status = undefined;
  
      if (noStandarStatus){
        status = !standarStatuses.includes(noStandarStatus.toString())
          ? getStandarStatus(noStandarStatus)
          : noStandarStatus.toString() as Status;
      }
    

      const Comp = asChild ? Slot : "span";

      return (
        <Comp
          role="status"
          className={clsx(badgeVariants({ status, size, className: clsx(className,
            icon && "!px-1.5"
          ) }))}
          ref={ref}
          {...props}
        >
          {/* // Usa 'text' si está presente, de lo contrario usa 'statusTextObj[status]' */}
          {IconLeft}
          {(!hiddenText && status) && (text || statusTextObj[status])} 
          {IconRight}
        </Comp>
      );
    }
  );

Badge.displayName = "Badge";
export { Badge, badgeVariants };
