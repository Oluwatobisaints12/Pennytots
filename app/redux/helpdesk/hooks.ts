import { tickets } from 'app/api';
import { useQuery, useMutation } from '@tanstack/react-query';
import {queryClient} from "app/redux/user/hooks"
import { HelpDeskDTO } from './types';

export function useGetHelpDeskTickets() {
  return useQuery(['helpdesk-tickets'], tickets.getHelpDeskTickets);
}

export function useGetHelpDeskCategories() {
  return useQuery(['helpdesk-categories'], tickets.getHelpDeskCategories);
}

export function useCreateTicket() {
  return useMutation(
    (payload: any) => {
      return tickets.createTicket(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries(['helpdesk-tickets']);
      },
    },
  );
}

export function useGetHelpdeskMessages(helpdeskId: string) {
  return useQuery(['helpdesk-messages', { helpdeskId }], () => {
    return tickets.getHelpDeskMessages(helpdeskId);
  });
}

export function useReplyHelpDeskMessage() {
  return useMutation(
    (payload: HelpDeskDTO) => {
      return tickets.replyHelpDeskMessage(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries(['helpdesk-messages']);
      },
    },
  );
}
