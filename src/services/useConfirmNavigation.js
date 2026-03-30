import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useConfirmNavigation({ onConfirm }) {
  const [showModal, setShowModal] = useState(false);
  const [nextAction, setNextAction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      if (showModal) return;
      setShowModal(true);
      setNextAction(() => async () => {
        await onConfirm?.();
        navigate("/login", { replace: true });
      });
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, onConfirm]);

  const handleConfirm = async () => {
    setShowModal(false);
    if (nextAction) await nextAction();
  };

  const handleCancel = () => {
    setShowModal(false);
    setNextAction(null);
  };

  return { showModal, handleConfirm, handleCancel };
}
