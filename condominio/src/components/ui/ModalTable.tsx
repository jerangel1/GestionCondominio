import React from "react";
import { useTableStore } from "@/shared/providers/table-provider";
import { type ModalProps, Modal } from "./Modal";
import { type ModalProps as ModalPropsV2, Modal as ModalV2 } from "./ModalV2";

export default function ModalTableOld({
  title,
  category,
  children,
	className,
	size
}: Omit<ModalProps, "isOpen" | "onClose"> & { category: string | string[] }) {
  const { isOpenModal, modalCategory, setClosedModal } = useTableStore(
    (state) => ({
      ...state,
    })
  );

  let isCategory = false;

  if(typeof category === "object" && modalCategory){
    isCategory = category.includes(modalCategory);
  }

  if(typeof category === "string" && modalCategory){
    isCategory = category === modalCategory;
  }

  return (
    <Modal
			size={size}
      isOpen={isOpenModal && isCategory}
      title={title}
			className={className}
      onClose={setClosedModal}
    >
      {children}
    </Modal>
  );
}

export const ModalTable = ({
  title,
  category,
  children,
	className
}: Omit<ModalPropsV2, "isOpen" | "onClose"> & { category: string | string[] }) => {
  const { isOpenModal, modalCategory, setClosedModal } = useTableStore(
    (state) => ({
      ...state,
    })
  );

  let isCategory = false;

  if(typeof category === "object" && modalCategory){
    isCategory = category.includes(modalCategory);
  }

  if(typeof category === "string" && modalCategory){
    isCategory = category === modalCategory;
  }

  return (
    <ModalV2
      isOpen={isOpenModal && isCategory}
      title={title}
			className={className}
      onClose={setClosedModal}
    >
      {children}
    </ModalV2>
  );
}

