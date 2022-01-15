// Toast Types START -->
export type ToastProps = {
  showToast: boolean;
  toastMessage: string;
  toastType: ToastTypes;
};

export interface ToastAction {
  toastType: ToastTypes;
  toastMessage: string;
}

export type ToastTypes = 'success' | 'error' | 'info' | 'warning' | undefined;
// <-- Toast Types END
