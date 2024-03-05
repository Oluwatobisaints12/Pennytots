import { quiz } from 'app/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {queryClient} from "app/redux/user/hooks"



  export function useGetQuestions() {
    const { data, isLoading, refetch,isFetching } = useQuery(['quiz'], quiz.getQuestions, {
      cacheTime: 0, // Disable caching
      refetchOnMount: false, // Do not refetch on mount
      refetchOnWindowFocus: false, // Do not refetch on window focus
    });
  
    return { data,isLoading, refetch,isFetching };
  }

  export function useChangeUserPennytots() {
    return {
      mutate: async (type: "reduce" | "increase") => {
        // Invalidate the credit query
        queryClient.invalidateQueries(['credit']);
        
        // Call your quiz function
        return await quiz.changeUserPennyTots(type);
      }
    };
  }


