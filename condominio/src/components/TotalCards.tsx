import clsx from "clsx";
import Link from "next/link";

type TotalCardProps = {
    title: string;
    value: string; // Cambiado a string para incluir " Bs"
    href: string;
    color: string;
    icon: JSX.Element; // Cambiado a JSX.Element
    colorIcon: string;
};

export const TotalCard = ({
    title,
    value,
    icon,
    href,
    color,
    colorIcon,
}: TotalCardProps) => (
    <Link
        href={href}
        className="flex items-center justify-between px-6 py-8 no-underline shadow border-section transition hover:shadow-md shadow-zinc-300/40 rounded-xl text-black/80 visited:text-black/80 actived:text-black/80"
    >
        <div>
            <div className="text-base font-medium">{title}</div>
            <div className="text-3xl mt-0.5 font-medium">{value}</div>
        </div>
        <div
            className="w-16 h-16 flex items-center justify-center rounded-xl"
            style={{
                backgroundColor: color,
            }}
        >
            {icon} {/* Renderiza el icono como un elemento JSX */}
        </div>
    </Link>
);

export default TotalCard;