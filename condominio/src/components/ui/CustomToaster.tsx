import { Check, Ban, X } from "lucide-react";
import toast, { ToastType, Toaster, resolveValue } from "react-hot-toast";
import clsx from "clsx";

const textActions: Record<ToastType, string> = {
  success: "Operación Exitosa!",
  error: "Ha ocurrido un error",
  loading: "Cargando",
  blank: "",
  custom: "",
};

export const CustomToaster = () => {
  return (
    <Toaster
			containerClassName="group"
      toastOptions={{
        duration: 2500,
        className: "",
        success: {
          icon: (
            <Check
              className="w-[1.125rem] h-[1.125rem] stroke-2"
              strokeWidth={1}
            />
          ),
        },
        error: {
          icon: (
            <Ban
              className="w-[1.125rem] h-[1.125rem] stroke-2"
              strokeWidth={1}
            />
          ),
        },
        style: {
          border: "1px solid #713200",

          color: "#713200",
        },
      }}
      position="bottom-right"
    >
      {(t) => (
        <div
          className={clsx(
            "max-w-sm   w-full text-zinc-900 border bg-white overflow-hidden relative shadow flex flex-col border-solid rounded-xl",
            {
              "border-[#48CA93]": t.type === "success",
              "border-[#ed4a4a]": t.type === "error",
              "animate-[toastEnter_0.5s_both_cubic-bezier(0,1,.5,1)]": t.visible,
              "animate-[toastExit_0.3s]": !t.visible,
            }
          )}
          style={{ opacity: t.visible ? 1 : 0 }}
        >
          <div className="px-8 py-5">
            <div className="flex flex-row items-center gap-2">
              <div
                className={clsx(
                  "text-white p-1 rounded-lg flex items-center justify-center",
                  {
                    "bg-[#48CA93]": t.type === "success",
                    "bg-[#ed4a4a]": t.type === "error",
                  }
                )}
              >
                {t.icon}
              </div>
              <div className="font-medium text-lg">{textActions[t.type]}</div>
            </div>
            <div className="mt-3 text-sm">{resolveValue(t.message, t)}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className=" absolute text-zinc-900 top-3 right-3 bg-transparent border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2"
            >
              <X />
            </button>
            {/* {t.} */}
          </div>
          <div className="bg-gray-100">
            <div
              className={clsx(
                "h-[0.375rem] pause duration-1000 group-hover:!pause",
                t.type == "success" && "bg-[#48CA93]",
                t.type == "error" && "bg-[#ed4a4a]"
              )}
              style={{
                animation: "lineToast",
                animationDuration: `${t.duration}ms`,
                animationTimingFunction: "linear",
              }}
            />
          </div>
        </div>
      )}
    </Toaster>
  );
};
