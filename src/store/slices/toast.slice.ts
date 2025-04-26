// store/slices/toast.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastPayload {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

const toastSlice = createSlice({
  name: 'toast',
  initialState: null as ToastPayload | null,
  reducers: {
    showToast: (_, action: PayloadAction<ToastPayload>) => action.payload,
    clearToast: () => null,
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
