import { main } from 'app/api';
import { useQuery } from '@tanstack/react-query';

interface SearchPayload {
  search: string;
  searchType: string;
}

export default function useSearch(payload: SearchPayload) {
  return useQuery(['search', payload], main.search, {
    enabled: payload.search.length > 2, //enable if search has value greater than 2
  });
}

export function useGetUnreadNotifications(enabled: boolean) {
  return useQuery(['unread-notifications'], main.unreadNotifications, {
    refetchInterval: 60000, // 1 min
    enabled: enabled == true,
  });
}
