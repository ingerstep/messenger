"use client";

import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {FiAlertTriangle} from 'react-icons/fi'

import { useConversation } from "@/app/hooks/useConversation";
import { Modal } from "@/app/components/Modal";
import { DialogTitle } from "@headlessui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return <Modal isOpen={isOpen} onClose={onClose}>
    <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <DialogTitle as="h3" className='text-base font-semibold leading-6 text-gray-900'>
                Delete conversation
            </DialogTitle>
            <div className="mt-2">
                <p className="text-sm text-gray-500">Are you sure want to delete this conversation? This action cannot be undone.</p>
            </div>
        </div>
    </div>
  </Modal>;
};
