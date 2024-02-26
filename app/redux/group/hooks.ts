import { group } from 'app/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ShowAlert } from 'app/providers/toast';
import { queryClient } from 'app/redux/user/hooks';

export function useGetGroup(id: string) {
  const { data, isLoading: isQueryLoading } = useQuery(
    ['group', { id }],
    () => {
      return group.getGroup(id);
    },
    {
      enabled: id !== null,
    },
  );

  const isLoading = id !== null && isQueryLoading;

  return { data, isLoading };
}

export function useMyGroups() {
  return useQuery(['my-groups'], group.getMyGroups);
}

export function useSuggestedGroups() {
  return useQuery(['suggested-groups'], group.getSuggestedGroups);
}

export function useUpdateGroup() {
  return useMutation(
    (payload: any) => {
      return group.updateGroup(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries(['group']);

        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.message,
        });
      },
    },
  );
}

export function useUpdateGroupPicture() {
  return useMutation(
    (payload: any) => {
      return group.updateGroupPicture(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries(['group']);

        ShowAlert({
          type: 'success',
          className: 'Success',
          message: response.message,
        });
      },
    },
  );
}
