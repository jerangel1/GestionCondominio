import { Modal, type ModalProps } from "@/components/ui";
import { createElement, useState, type ReactNode } from "react";

type useConfirmOptions = {
  onConfirm?: (payload?: unknown) => void;
  onReject?: (reason: string, payload?: unknown) => void;
  onCancel?: () => void;
};

type ConfirmationDialogProps = {
  children?: ({
    handleConfirm,
    handleCancel,
    handleReject,
  }: {
    handleConfirm: () => void;
    handleCancel: () => void;
    handleReject: (reason: string) => void;
  }) => ReactNode;
} & Omit<ModalProps, "children" | "isOpen" | "onClose">;

export const useConfirm = ({
  onConfirm,
  onReject,
  onCancel,
}: useConfirmOptions = {}) => {

  const [payload, setPayload] = useState<unknown>();
  const [promise, setPromise] = useState<{
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: string) => void;
  } | null>(null);

  const confirm = (payload?: unknown) => {
    if(payload) {
      setPayload(payload);
    }

    return new Promise<boolean | string>((resolve, reject) => {
      setPromise({ resolve, reject });
    });
  };

  const handleOnClose = () => {
    promise?.resolve(false);
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleOnClose();
    if (onConfirm) onConfirm(payload);
  };

  const handleReject = (reason: string) => {
    promise?.reject(reason);
    handleOnClose();
    if (onReject) onReject(reason, payload);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleOnClose();
    if (onCancel) onCancel();
  };

  const AsyncModal = ({ children, ...props }: ConfirmationDialogProps) => {
    return createElement(
      Modal,
      {
        ...props,
        isOpen: promise !== null,
        onClose: handleOnClose,
      },
      children
        ? children({
            handleConfirm,
            handleReject,
            handleCancel,
          })
        : null
    );
  };

  return { AsyncModal, confirm };
};
