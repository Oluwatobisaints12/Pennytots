import { useMutation, useQuery } from '@tanstack/react-query';
import {queryClient} from "app/redux/user/hooks"
import { credit } from 'app/api/credit';
import { ShowAlert } from 'app/providers/toast';

export function useGetCredit() {
  return useQuery(['credit'], credit.getCredit);
}

export function useGetFreeCredit() {
  return useMutation(
    () => {
      return credit.getFreeCredit();
    },
    {
      onSuccess: (response:any, variables, context) => {
        queryClient.invalidateQueries(['credit']);

        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.message,
        });
      },
    },
  );
}

export function useGetCreditTransactionHistory() {
  return useQuery(['credit-transaction-history'], credit.getTransactionHistory);
}

export function useBuyCredit() {
  return useMutation(
    (payload: any) => {
      return credit.buyCredit(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        //   queryClient.invalidateQueries(['helpdesk-tickets']);
      },
    },
  );
}
