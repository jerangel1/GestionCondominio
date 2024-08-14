import { type ForwardedRef, type UIEventHandler, forwardRef } from "react";
import { flexRender, type Table } from "@tanstack/react-table";
import Loader from "../loaders/Loader";

import clsx from "clsx";
import { ChevronsUp, SearchX } from "lucide-react";

export type CommonTypeProps<T> = {
    onScroll?: UIEventHandler<HTMLDivElement>;
    isRefeching?: boolean;
    isFetchingNextPage?: boolean;
    isLoading?: boolean;
    table: Table<T & { rowState?: "NEW" }>;
    height?: string;
    classNameCell?: string;
    newRows?: number;
};

const CommonTableInner = <T,>(
    {
        onScroll,
        isRefeching,
        height = "600px",
        isFetchingNextPage,
        isLoading,
        table,
        classNameCell,
        newRows,
    }: CommonTypeProps<T>,
    ref: ForwardedRef<HTMLDivElement>
) => {


    return <div
        onScroll={onScroll}
        ref={ref}
        style={{
            height: height,
            maxHeight: height
        }}
        className={clsx(
            "bg-white mt-3 flex flex-col relative shadow-sm border-zinc-300 border border-solid rounded-t-lg w-full",
            isLoading ? "overflow-hidden" : "overflow-scroll",
            height
        )}
    >
        <table className="w-full relative border-spacing-0">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                        style={{
                            borderLeftStyle: "none",
                            borderRightStyle: "none",
                            borderTopStyle: "none",
                        }}
                        className="sticky z-10 h-10 top-0 bg-[#fdfdfd]"
                        key={headerGroup.id}
                    >
                        {headerGroup.headers.map((header) => (
                            <th
                                style={{
                                    width: header.getSize(),
                                    borderLeftStyle: "none",
                                    borderRightStyle: "none",
                                    borderTopStyle: "none",
                                }}
                                className="border-zinc-200 text-left border border-solid"
                                key={header.id}
                                colSpan={header.colSpan}
                            >
                                {header.isPlaceholder ? null : (
                                    <>
                                        <div className="px-4 font-normal text-zinc-950 text-sm py-2">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                        {header.column.getCanFilter() ? (
                                            <div>
                                                {/* <Filter column={header.column} table={table} /> */}
                                            </div>
                                        ) : null}
                                    </>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => {
                    return <tr
                        key={row.id}
                        data-new={row.original.rowState === "NEW"}
                        data-newa={row.index === 2}
                        className="data-[new=true]:bg-zinc-50 data-[newa=true]:border-solid border border-solid"
                    >
                        <>

                            {row.getVisibleCells().map((cell) => (
                                <td
                                    style={{
                                        borderLeftStyle: "none",
                                        borderRightStyle: "none",
                                        borderTopStyle: "none",
                                    }}
                                    className={clsx(
                                        "px-4 border-zinc-100 text-zinc-950 border border-solid text-sm h-10",
                                        isRefeching && "!opacity-40",
                                        classNameCell)}
                                    key={cell.id}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </>
                    </tr>
                })}
            </tbody>

        </table>
        {(typeof newRows != "undefined" && newRows > 0) &&
            <span style={{
                top: `${2.5 * (newRows + 1)}rem`
            }} className="absolute left-1/2 -translate-y-1/2 px-4 flex items-center w-full  justify-center rounded-full -translate-x-1/2 h-px bg-zinc-200 bottom top-[12.5rem]">
                <span className="bg-white border-solid border border-zinc-200 rounded-full gap-0.5 flex font-semibold justify-center items-center px-1 text-zinc-700  py-px text-[10px]">
                    <ChevronsUp strokeWidth={2.5} className="w-3 h-3" />
                    <span>Nuevo</span>
                    <ChevronsUp strokeWidth={2.5} className="w-3 h-3" />
                </span>
            </span>
        }
        {isFetchingNextPage &&
            <div className="flex w-full justify-center py-4 flex-row items-center relative">
                <Loader />
            </div>
        }
        {table.getRowModel().rows.length === 0 && (
            <div className="m-auto flex flex-col items-center text-black/70 gap-2">
                <SearchX strokeWidth={2} className="w-8 h-8" />
                <div className="text-sm">No se encontraron registros</div>
                {/* <div> Resear Filtros</div> */}
            </div>
        )}
    </div>
};

export const CommonTable = forwardRef(CommonTableInner) as <T>(
    props: CommonTypeProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof CommonTableInner>;
