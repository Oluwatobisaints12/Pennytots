import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userStateModel } from './types';

const initialState: userStateModel = {
  isLoggedIn: false,
  userId: '',
  authInfo: null,
  token: '',
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userStateModel>) => {
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.authInfo = action.payload.authInfo;
      state.token = action.payload.token;
    },
    updateUser: (state, action) => {
      state.authInfo = action.payload;
    },
    clearUserAuth: (state) => {
      state.userId = '';
      state.authInfo = null;
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, updateUser, clearUserAuth } = authSlice.actions;

export const IsLoggedIn = (state: any) => state.user.isLoggedIn;
export const userToken = (state: any) => state.user.token;
export const userAuthInfo = (state: any) => state.user.authInfo;
export const userId = (state: any) => state.user.userId;

export default authSlice.reducer;
