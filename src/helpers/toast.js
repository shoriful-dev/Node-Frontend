import { Bounce, toast } from "react-toastify";

export const successToast = (msg, postion = "top-left") => {
  toast.success(msg, {
    position: postion,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const errorToast = (msg, postion = "top-center") => {
  toast.error(msg, {
    position: postion,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
export const infoToast = (msg, postion = "bottom-center") => {
  toast.info(msg, {
    position: postion,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
