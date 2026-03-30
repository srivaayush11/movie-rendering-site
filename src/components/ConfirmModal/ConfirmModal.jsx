import "./ConfirmModal.css";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "Do you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="buttons">
          <button className="cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
