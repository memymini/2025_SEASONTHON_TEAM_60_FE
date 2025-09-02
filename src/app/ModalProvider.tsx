"use client";

import Modal from "@/components/common/Modal";
import { useModalStore } from "@/stores/modal";

export default function ModalProvider() {
  const { isOpen, content, close } = useModalStore();
  return (
    <Modal
      open={isOpen}
      onClose={close}
      className="bg-surface-1 rounded-xl px-9 py-7"
    >
      {content}
    </Modal>
  );
}
