import React, { ReactNode } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "./Button";
import clsx from "clsx";
import { X } from "lucide-react";
import {
  ModalStoreProvider,
  useModalStore,
} from "@/shared/providers/modal-provider";

const modalVariants = cva(
  [
    "outline-0",
    "bg-[#FEFEFE]",
    "shadow-xl",
    "border-0",
    "rounded-t-xl sm:rounded-xl",
    "w-fit",
    "h-fit"
  ]
);

export type CustomLayoutPropsType = {
  Title: ({ children }: { children?: React.ReactNode }) => JSX.Element;
  CloseButton: () => JSX.Element;
  handleClose?: () => void;
};

const ModalTranstionRoot = ({
  isOpen,
  afterLeave,
  resetStepAfterLeave = true,
  initialStep,
  children,
}: {
  isOpen: boolean;
  afterLeave?: () => void;
  resetStepAfterLeave?: boolean;
  initialStep?: string;
  children: React.ReactNode;
}) => {
  const { setCurrentStep } = useModalStore((state) => state);

  const handleOnAfterLeave = () => {
    if (resetStepAfterLeave && typeof initialStep !== "undefined") {
      setCurrentStep(initialStep);
    }
    if (afterLeave) {
      afterLeave();
    }
  };

  return (
    <Transition show={isOpen} as={Fragment} afterLeave={handleOnAfterLeave}>
      {children}
    </Transition>
  );
};

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  className?: string;
  title?: string;
  afterLeave?: () => void;
  initialStep?: string;
  resetStepAfterLeave?: boolean;
} & VariantProps<typeof modalVariants>;

export const Modal = ({
  children,
  isOpen,
  onClose,
  className,
  initialStep,
  title,
  afterLeave,
  resetStepAfterLeave
}: ModalProps) => (
  <ModalStoreProvider
    isOpen={isOpen}
    title={title}
    onClose={onClose}
    initialStep={initialStep}
  >
    <ModalTranstionRoot
      resetStepAfterLeave={resetStepAfterLeave}
      initialStep={initialStep}
      isOpen={isOpen}
      afterLeave={afterLeave}
    >
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
        <div className="fixed inset-0">
          <div className="flex items-end justify-center sm:items-center min-h-full sm:p-2">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
              enterTo="translate-y-0  sm:opacity-100 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
              leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  modalVariants({
                    className,
                  })
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </ModalTranstionRoot>
  </ModalStoreProvider>
);

const ModalHeader = ({ title }: { title: string }) => {
  const { onClose } = useModalStore((state) => state);

  return (
    <div className="px-5 h-14 py-2 border-solid border-x-0 border-t-0 border-b border-zinc-200 flex justify-between items-center flex-row">
      <Dialog.Title
        as="h1"
        className="text-[17px] font-medium leading-4 text-zinc-800"
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
        <X strokeWidth={1.5} className="text-zinc-600 w-6 h-6" />
      </Button>
    </div>
  );
};

const bodyVariants = cva(
  ["px-5", "overflow-x-hidden", "text-[15px]", "leading-[23px]"],
  {
    variants: {
      size: {
        extraSmall: "py-6 w-[460px] max-h-[320px]",
        small: "py-7 w-[600px] max-h-[380px]",
        medium: "py-8 w-[780px] max-w-screen  max-h-[700px]",
        large: "w-[1024px] max-h-[800px]",
        extraLarge: "max-w-[1024px] max-h-[620px]",
        "2xl": "max-w-[1198px] max-h-[700px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type BodyProps = {
  children: ReactNode;
  noScroll?: boolean;
  noPadding?: boolean;
  height?: number;
  width?: number;
} & VariantProps<typeof bodyVariants>;

const ModalBody = ({
  children,
  noPadding,
  height,
  width,
  size,
  noScroll = false,
}: BodyProps) => (
  <div
    style={{
      height: height ? `${height}px` : undefined,
      width: width ? `${width}px` : undefined
    }}
    className={clsx(
      bodyVariants({
        size,
        className: clsx({
          "overflow-y-hidden": noScroll,
          "overflow-y-scroll": !noScroll,
          "!p-0": noPadding,
        }),
      })
    )}
  >
    {children}
  </div>
);

const ModalDivider = () => (
  <hr className="flex my-6 border-solid border border-zinc-300 border-b-0 w-full " />
);

const actionsVariants = cva([
  "border-solid",
  "border-t",
  "border-zinc-200",
  "border-x-0",
  "border-b-0",
  "h-14",
  "flex",
  "gap-2",
  "justify-end",
  "items-center",
  "px-5",
]);

const ModalActions = ({ children }: { children: ReactNode }) => {
  const { size } = useModalStore((store) => ({
    ...store,
  }));

  return (
    <div
      // className="border-solid w-full mb-4 flex justify-between items-center bg-white z-10 flex-row"
      className={actionsVariants({
        // size,
        // shape,
        // className
      })}
    >
      {children}
    </div>
  );
};

const ModalStep = ({
  children,
  step,
}: {
  children: ReactNode;
  step: string;
}) => {
  const { currentStep } = useModalStore((store) => ({
    ...store,
  }));

  if (typeof currentStep === "undefined") {
    throw new Error("Missing initial step in modal root");
  }

  return currentStep === step ? children : <></>;
};

const ModalActionsRight = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-row gap-3">{children}</div>
);

const ModalActionsLeft = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-row gap-3">{children}</div>
);

ModalHeader.displayName = "dasd";

Modal.header = ModalHeader;
Modal.body = ModalBody;
Modal.step = ModalStep;
Modal.actions = ModalActions;
Modal.actionsRight = ModalActionsRight;
Modal.actionsLeft = ModalActionsLeft;
Modal.divider = ModalDivider;
Modal.closeAction = ModalActions;
// Modal.closeAction = ModalActions;
