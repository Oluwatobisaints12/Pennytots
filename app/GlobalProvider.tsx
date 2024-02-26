import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  FunctionComponent,
} from 'react';
import { ToastAndroid, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type GlobalContextTypes = {
  appToken: string | null;
  MAIN_URL: string | null;
  showToast: (message: string) => void | undefined;
  setMyId: React.Dispatch<React.SetStateAction<string | null>> | null;
  myId: string | null;
  myProfile: AccountProfileProp | null;
  setAPIAuthToken: (token: string) => void | null;
  setAppToken?: React.Dispatch<React.SetStateAction<string | null>>;
  AXIOS: any | null;
  getMyId: () => Promise<true | undefined> | null;
  getMyProfile?: () => Promise<AccountProfileProp>;
  setMyProfile: React.Dispatch<React.SetStateAction<AccountProfileProp | null>>;
  signOut: any | null;
};

export const GlobalContext = createContext<GlobalContextTypes>({
  appToken: null,
  MAIN_URL: null,
  showToast: () => {},
  setMyId: null,
  myId: null,
  myProfile: null,
  setAPIAuthToken: () => {},
  setAppToken: undefined,
  AXIOS: null,
  getMyId: () => null,
  getMyProfile: undefined,
  setMyProfile: () => {},
  signOut: null,
});

type GlobalProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider: FunctionComponent<GlobalProviderProps> = ({
  children,
}) => {
  //const MAIN_URL: string = 'http://192.168.0.153:8000';
  //const MAIN_URL: string= 'https://pennytots.nw.r.appspot.com';
  //const MAIN_URL: string = 'http://172.20.10.3:8000';
  const MAIN_URL: string = 'https://pennytot.herokuapp.com';

  const [appToken, setAppToken] = useState<string | null>(null);
  const [myProfile, setMyProfile] = useState<AccountProfileProp | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const AXIOS = useRef<any | null>(null);
  const signOut = useRef<any | null>(false);
  const [API, setAPI] = useState<number | null>(null);

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  async function getMyId() {
    try {
      if (myId === null) {
        //   console.log('here for the first time');
        let id = await AsyncStorage.getItem('myId');
        setMyId(id);
        return true;
      } else {
        //   console.log('being here before');
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMyProfile(): Promise<AccountProfileProp> {
    if (!myProfile && appToken) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: MAIN_URL + '/user/view-profile',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${appToken}`,
          },
        })
          .then((response) => {
            //  console.log('progressss', response.data);
            setMyProfile(response.data);
            resolve(response.data);
          })
          .catch((error) => {
            console.log('err1', error);
            return resolve(null);
          });
      });
    } else {
      console.log('i have been here before yes i said it');
      return new Promise((resolve, reject) => {
        resolve(myProfile);
      });
    }
  }

  function showToast(message: string) {
    // ToastAndroid.showWithGravity(
    //   message,
    //   ToastAndroid.SHORT,
    //   ToastAndroid.BOTTOM,
    // );
  }

  useEffect(() => {
    if (!AXIOS.current) {
      console.log('bror');
      initializeAxios();
    }
  }, [AXIOS]);

  function initializeAxios() {
    AXIOS.current = axios.create({
      baseURL: `${MAIN_URL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(AXIOS.current, 'should work');

    AXIOS.current.interceptors.response.use(
      (response: any) => {
        if (response.status === 401) {
          console.log('You are not authorized');
          //redirect
        }
        return response;
      },
      (error: any) => {
        if (error.response && error.response.data) {
          if (
            error.response.data.errorStatus &&
            error.response.data.errorStatus == 'suspended'
          ) {
            signOut.current = true;
            setAPI(2);
            return Promise.reject(error.response.data.message);
          }
          if (error.response.data.message) {
            showToast(error.response.data.message.toString());

            return Promise.reject(error.response.data.message);
          }

          return Promise.reject(error.response.data);
        }

        return Promise.reject(error.message);
      },
    );
    setAPI(1);
  }

  const setAPIAuthToken = (token: string) => {
    if (token) {
      // Apply to every request
      AXIOS.current.defaults.headers.common['Authorization'] =
        'Bearer ' + token;
    } else {
      // Delete auth header
      delete AXIOS.current.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    async function getAuth() {
      await AsyncStorage.getItem('token').then(async (item) => {
        if (item) {
          setAppToken(item);
          getMyId();
        }
        setLoadingComplete(true);
      });
    }

    getAuth();
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  const GlobalContextValues: GlobalContextTypes = {
    MAIN_URL,
    AXIOS: AXIOS.current,
    setAPIAuthToken,
    appToken,
    setAppToken,
    myId,
    setMyId,
    getMyId,
    myProfile,
    getMyProfile,
    setMyProfile,
    showToast,
    signOut,
  };

  return (
    <GlobalContext.Provider value={GlobalContextValues}>
      {children}
    </GlobalContext.Provider>
  );
};
