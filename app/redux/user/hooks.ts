import { clearUserAuth, setUser, updateUser } from 'app/redux/user/reducer';
import { user } from 'app/api';
import { store } from 'app/redux';
import {IAccountSignInDTO,reportUserDTO,IAccountRegisterDTO } from "./types"
import { Axios } from 'app/api/axios';
import { clearDeviceToken, setLoading } from '../main/reducer';
import { useMutation } from '@tanstack/react-query';
import { ShowAlert } from 'app/providers/toast';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      cacheTime: Infinity, //Always cache data
      // staleTime: ,
    },
  },
});

export const accountLogin = async ({
  phone_number,
  password,
}: IAccountSignInDTO) => {
  
  store.dispatch(setLoading(true));
  const data = await user.login({ phone_number, password }).finally(() => {
    store.dispatch(setLoading(false));
  });
  
  console.log("I ran X 2")
  Axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${data.data.token.token}`;

  //set Users
  store.dispatch(
    setUser({
      userId: data.data._id,
      authInfo: data.data,
      isLoggedIn: true,
      token: data.data.token.token,
    }),
  );

 
};

export const accountRegister = async (payload: IAccountRegisterDTO) => {
  store.dispatch(setLoading(true));

  const data = await user.register(payload).finally(() => {
    store.dispatch(setLoading(false));
  });

  Axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${data.data.token.token}`;

  //set Users
  store.dispatch(
    setUser({
      userId: data.data._id,
      authInfo: data.data,
      isLoggedIn: true,
      token: data.data.token.token,
    }),
  );

  setTimeout(() => {
    //wait a few seconds before setting notifications
    // useNotification();
  }, 1000);
};

export const updateUserInfo = async () => {
  const data = await user.profile();

  store.dispatch(updateUser(data));
};

export function useSendPhoneVerificationCode() {
  return useMutation(
    (payload: any) => {
      return user.sendPhoneVerification(payload);
    },
    // {
    //   onSuccess: (response, variables, context) => {
    //     // queryClient.invalidateQueries(['helpdesk-tickets']);
    //   },
    // },
  );
}

export function useValidatePhoneCode() {
  return useMutation(
    (payload: any) => {
      return user.validatePhoneNumber(payload);
    },
    {
      onSuccess: (response: any, variables, context) => {
        console.log(response, ' data from response');
        store.dispatch(updateUser(response.user));

        ShowAlert({
          type: 'success',
          message: response.message,
        });
      },
    },
  );
}

export function useSendResetPasswordToken() {
  return useMutation(
    (payload: any) => {
      return user.sendResetPasswordToken(payload);
    },
    {
      onSuccess: (response: any, variables, context) => {
        ShowAlert({
          type: 'success',
          message: response.message,
        });
      },
    },
  );
}

export function useReportUser() {
  return useMutation(
    (payload: reportUserDTO) => {
      return user.reportUser(payload.userId,payload.description);
    },
    {
      onSuccess: (response: any, variables, context) => {
        ShowAlert({
          type: 'success',
          message: response.message,
        });
      },
    },
  );
}

export const logout = () => {
  //clear all saved cache for user
  store.dispatch(clearUserAuth()); // clear user auth from redux
  store.dispatch(clearDeviceToken()); //delete device token

  //wait for route switch before clearing cache to prevent api calls
  setTimeout(() => {
    queryClient.invalidateQueries();
    delete Axios.defaults.headers.common['Authorization'];
  }, 1000);
};
