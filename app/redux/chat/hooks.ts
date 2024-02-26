import { chat } from 'app/api';
import { useQuery } from '@tanstack/react-query';

export default function useMyChat() {
  return useQuery(['my-chats'], chat.getChats, {
    staleTime: 360000, // 6 minutes,
    cacheTime: Infinity,
  });
}
