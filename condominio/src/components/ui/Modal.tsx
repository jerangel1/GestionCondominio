import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./Button";

import clsx from "clsx";
import { X } from "lucide-react";

const modalVariants = cva(
  [
    "outline-0",
    "w-full",
    "transition",
    "bg-[#FEFEFE]",
    "shadow-xl",
    "overflow-scroll",
    "border-0",
  ],
  {
    variants: {
      shape: {
        square: ["rounded-xl"],
        rounded: ["rounded-full"],
      },
      size: {
        extraSmall: ["max-w-md", "max-h-lg", "h-full"],
        small: ["max-w-xl", "max-h-xl"],
        medium: ["max-w-2xl", "max-h-[600px]"],
        large: ["max-w-4xl", "max-h-xl"],
        extraLarge: ["max-w-[1124px]", "max-h-[680px] h-[90vh]"],
        "2xl": ["max-w-[1180px]", "h-[764px]"],
        extraExtraLarge: ["max-w-[1500px]", "max-h-[680px] h-[90vh]"],
      },
      padding: {
        noPadding: "p-0",
        padding: "py-4 px-6",
      }
    },
    defaultVariants: {
      size: "medium",
      shape: "square",
      padding: "padding"
    },
  }
);

export type CustomLayoutPropsType = {
  Title: ({ children }: { children?: React.ReactNode }) => JSX.Element;
  CloseButton: () => JSX.Element;
  handleClose?: () => void;
};

export type ModalProps = {
  children?:
    | React.ReactNode
    | (({ Title, CloseButton }: CustomLayoutPropsType) => JSX.Element);
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  className?: string;
  title?: string;
  afterLeave?: () => void;
} & VariantProps<typeof modalVariants>;

export const Modal = ({
  children,
  isOpen,
  onClose,
  onSave,
  className,
  size,
  shape,
  title,
  padding,
  afterLeave
}: ModalProps) => (
  <Transition show={isOpen} as={Fragment} afterLeave={afterLeave}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/35" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={clsx(
                modalVariants({
                  size,
                  shape,
                  className,
                  padding
                })
              )}
            >
              {title && (
                <div
                  className={clsx(
                    "top-0 w-full mb-4 flex justify-between items-center bg-white z-10  flex-row",
                  )}
                >
                  <Dialog.Title
                    as="h1"
                    className="text-xl font-medium leading-6 text-black/80"
                  >
                    {title}
                  </Dialog.Title>
                  <Button
                    type="button"
                    shape="rounded"
                    variant="text"
                    size="icon"
                    onClick={onClose}
                  >
                    <i className="i-lucide-x text-black w-6 h-6" />
                  </Button>
                </div>
              )}
              <div className={clsx(className)}>
                {typeof children !== "function"
                  ? children
                  : children({
                      Title: ({ children }) => (
                        <Dialog.Title
                          as="h1"
                          className="text-xl font-medium leading-6 text-[#2c2c2c]"
                        >
                          {title ? title : children}
                        </Dialog.Title>
                      ),
                      CloseButton: () => (
                        <Button
                          type="button"
                          shape="rounded"
                          variant="text"
                          size="icon"
                          onClick={onClose}
                        >
                          <X />
                        </Button>
                      ),
                      handleClose: onClose
                    })}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
