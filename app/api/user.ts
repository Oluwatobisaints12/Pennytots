import { Axios } from 'app/api/axios';

const login = async (data: any) => {
  console.log(data)
  return await Axios.post('/user/login', data);
};

const register = async (data: any) => {
  return await Axios.post('/user/register', data);
};

const profile = async () => {
  const { data } = await Axios.get('/user/view-profile');
  return data;
};

const sendPhoneVerification = async (payload: any) => {
  const { data } = await Axios.post(
    '/user/send-verify-phone-number-token',
    payload,
  );

  return data;
};

const validatePhoneNumber = async (payload: any) => {
  const { data } = await Axios.post('/user/verify-phone-number-token', payload);

  return data;
};

const sendResetPasswordToken = async (payload: any) => {
  const { data } = await Axios.post('/user/send-verify-email-token', payload);

  return data;
};

const reportUser = async (userId: string,description: string) =>{
  const { data } = await Axios.patch('/user/report/' + userId, {description});

  return data;
}

export const user = {
  login,
  register,
  profile,
  sendPhoneVerification,
  validatePhoneNumber,
  sendResetPasswordToken,
  reportUser
};
