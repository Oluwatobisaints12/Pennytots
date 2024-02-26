import axios from 'axios';
import { setDeviceToken } from 'app/redux/main/reducer';
import { store } from 'app/redux';
import { isReadyRef } from 'app/navigation/root';
import { MAIN_URL } from 'app/api/axios';

export async function registerDeviceToken(deviceToken: string) {
  try {
    let savedDeviceToken = store.getState().main.deviceToken;
    let token = store.getState().user.token;

    if (token && isReadyRef.current) {

      const payload = {
        device_token: deviceToken,
      };

      const options = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios
        .post(MAIN_URL + '/user/device-token', payload, options)
        .then(() => {
          console.log('token-saved');
          store.dispatch(setDeviceToken(deviceToken));
        })
        .catch((error) => {
          console.log(error, `error ${payload.device_token} failed from sending token`);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            console.log('error = ', error.response.data.message);
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
}
