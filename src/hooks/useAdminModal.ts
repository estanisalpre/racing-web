import { useState } from "react";

type ModalType = "leagues" | "events" | "tracks" | null;

export function useAdminModal() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  return { modalType, openModal, closeModal };
}