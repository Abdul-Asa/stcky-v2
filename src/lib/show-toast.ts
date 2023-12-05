import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info" | "default" | "warning";
type ToastProps = {
  message: string;
  type: ToastType;
};

const showToast = ({ message, type = "default" }: ToastProps) => {
  const options: ToastOptions = {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  switch (type) {
    case "default":
      toast(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "success":
      toast.success(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
  }
};

export default showToast;
