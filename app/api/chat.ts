import { Axios } from '../api/axios';

const getChats = async () => {
  console.log('i was called');

  const { data } = await Axios.get('/chats/my-chats');

  console.log(data, ' ==== data datas');
  return data.chats.docs;
};

export const chat = {
  getChats,
};
