import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { ChevronLeft, House, DollarSign, Settings, Users, Building, LogOut } from "lucide-react"; // Importar LogOut
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./Button";

type SidebarProps = {
    isMinimized: boolean;
    setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
    userName: string;
}

const menuItems = [
    { title: "Inicio", path: "/home", icon: House },
    { title: "Cobranza", path: "/home/cobranza", icon: DollarSign },
    { title: "Configuración", path: "/home/configuracion", icon: Settings },
    { title: "Residentes", path: "/home/residentes", icon: Users },
];

export const Sidebar: React.FC<SidebarProps> = ({ isMinimized, setIsMinimized, userName }) => {
    const router = useRouter();
    const currentPath = router.asPath;

    return (
        <div className="h-screen sticky top-0">
            <aside className={clsx(
                "h-full py-4 border-r border-zinc-200 border-solid transition-all duration-300 flex flex-col", // Cambiado a flex-col
                isMinimized ? "w-16" : "w-64"
            )}>
                <ChevronLeft
                    className={clsx(
                        "w-8 text-gray-800 h-[1.375rem] transition-transform duration-300 absolute top-3 right-1 p-1 cursor-pointer hover:bg-zinc-200/50 hover:rounded-full",
                        isMinimized ? "rotate-180" : ""
                    )}
                    onClick={() => setIsMinimized(!isMinimized)}
                />
                <div className={clsx(
                    "text-gray-500 px-4 text-sm mb-4",
                    isMinimized ? "flex items-center gap-4" : "flex flex-col items-center"
                )}>
                    {isMinimized ? (
                        <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center">
                            <Building className="w-5 h-5" />
                        </div>
                    ) : (
                        <>
                            <span>Hola {userName}</span>
                            <span>Condominio Manhattan Palace</span>
                            <span>RIF J-123456789-0</span>
                        </>
                    )}
                </div>
                <div className="space-y-2 flex-grow"> {/* Añadido flex-grow para ocupar el espacio disponible */}
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(
                                "hover:bg-zinc-200/50 no-underline cursor-pointer rounded-lg px-3 py-2.5 flex items-center justify-between font-normal text-sm mb-2",
                                item.path === currentPath ? "text-zinc-950 bg-slate-200" : "text-zinc-800"
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center">
                                    <item.icon className="w-5 h-5 text-gray-800" />
                                </div>
                                <span className={isMinimized ? "hidden" : ""}>
                                    {item.title}
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="mt-auto"> {/* Asegura que el botón de cierre de sesión esté al final */}
                    <SignOutButton>
                        <Button className={clsx(
                            "flex items-center justify-between w-full px-3 py-2.5 text-sm ",
                            isMinimized ? "text-red-600" : "text-black"
                        )}>
                            {isMinimized ? <LogOut className="w-5 h-5" /> : <span className="flex items-center gap-2"><LogOut className="w-5 h-5" /> Cerrar sesión</span>}
                        </Button>
                    </SignOutButton>
                </div>
            </aside>
        </div>
    );
};