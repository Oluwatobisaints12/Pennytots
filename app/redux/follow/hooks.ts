import { follow } from 'app/api';
import { useQuery, useMutation } from '@tanstack/react-query';

interface IsFollowingResponse {
  isFollowing: boolean;
}

export function useIsFollowingUser(userId :any) {
  const { data , isLoading } : any= useQuery(
    ['isFollowing', userId],
    () => follow.isFollowingUser(userId),
  );

  return { data , isLoading };
}

export function useFollowUser() {
  const mutation = useMutation(
    (userId:any) => follow.followUser(userId),
  );

  return mutation;
}

export function useUnfollowUser() {
  const mutation = useMutation(
    (userId:any) => follow.unfollowUser(userId),
  );

  return mutation;
}
