"use client";

import Image from "next/image";
import { FC } from "react";

import { Modal } from "@/app/components/Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

export const ImageModal: FC<ImageModalProps> = ({ onClose, isOpen, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};
