import { useEffect } from "react";

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmColor = "bg-red-500 hover:bg-red-600",
  loading = false,
  onConfirm,
  onClose,
}) {

  useEffect(() => {

    const handleEscape = (e) => {

      if (e.key === "Escape") {

        onClose();

      }

    };

    if (isOpen) {

      document.addEventListener(
        "keydown",
        handleEscape
      );

    }

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]">

        {/* Header */}

        <div className="flex flex-col items-center px-8 pt-8">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <i className="fa-solid fa-trash text-red-500 text-3xl"></i>

          </div>

          <h2 className="mt-5 text-2xl font-bold text-[#172554] text-center">

            {title}

          </h2>

          <p className="mt-3 text-center text-gray-500 leading-relaxed">

            {message}

          </p>

        </div>

        {/* Footer */}

        <div className="flex gap-4 px-8 py-8">

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold hover:bg-gray-100 transition"
          >

            {cancelText}

          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl py-3 font-semibold text-white transition ${confirmColor}`}
          >

            {loading ? (

              <>

                <i className="fa-solid fa-spinner fa-spin mr-2"></i>

                Processing...

              </>

            ) : (

              confirmText

            )}

          </button>

        </div>

      </div>

    </div>

  );

}

export default ConfirmModal;