import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mainStateModel } from './types';

const initialState: mainStateModel = {
  deviceToken: '',
  appLoading: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setDeviceToken: (state, action: PayloadAction<string>) => {
      state.deviceToken = action.payload;
    },
    clearDeviceToken: (state) => {
      state.deviceToken = '';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.appLoading = action.payload;
    },
  },
});

export const { setDeviceToken, clearDeviceToken, setLoading } =
  mainSlice.actions;

export const deviceToken = (state: any) => state.main.isLoggedIn;
export const appLoading = (state: any) => state.main.appLoading;

export default mainSlice.reducer;
