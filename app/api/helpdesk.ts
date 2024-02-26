import { Axios } from './axios';
import { HelpDeskDTO } from '../redux/helpdesk/types';

const getHelpDeskTickets = async () => {
  const { data } = await Axios.get('/helpdesk/get-tickets');
  return data.tickets.docs;
};

const getHelpDeskCategories = async () => {
  const { data } = await Axios.get('/helpdesk/categories');
  return data.helpdeskCategories;
};

const createTicket = async (payload: any) => {
  const { data } = await Axios.post('/helpdesk/create-ticket', payload);
  return data;
};

const getHelpDeskMessages = async (helpdeskId: string) => {
  const { data } = await Axios.get('/helpdesk/get-messages/' + helpdeskId);
  return data.messages.docs;
};

const replyHelpDeskMessage = async (payload: HelpDeskDTO) => {
  const { data } = await Axios.post(
    '/helpdesk/reply-message/' + payload.helpdeskId,
    payload.data,
  );
  return data;
};

export const tickets = {
  getHelpDeskTickets,
  getHelpDeskCategories,
  createTicket,
  getHelpDeskMessages,
  replyHelpDeskMessage,
};
