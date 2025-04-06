import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const ToastInfo = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'blue-background inter-font',
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const ToastErr = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  color: '#fff',
  timerProgressBar: true,
  background: '#DD3634',
  customClass: {
    popup: 'blue-background inter-font',
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const ToastSuc = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    popup: 'blue-background inter-font',
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const showSuccessToast = (message) => {
  ToastSuc.fire({
    icon: 'success',
    title: message,
  });
};

export const showErrorToast = (message) => {
  ToastErr.fire({
    icon: 'error',
    title: message,
  });
};

export const showInfoToast = (message) => {
  ToastInfo.fire({
    icon: 'info',
    title: message,
  });
};
