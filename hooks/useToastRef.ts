import { useRef } from "react";
import { toast } from "react-toastify";

export default function useToastRef() {
  const toastId: any = useRef(null);

  const loadToast = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.loading("Processing ...", {
        position: "top-left",
        closeButton: true,
        isLoading: true,
      });
    }
  };
  const successToast = (text: string) =>
    toast.update(toastId.current, {
      render: text,
      type: "success",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });

  const errorToast = (text: string) =>
    toast.update(toastId.current, {
      render: text,
      type: "error",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });
}
