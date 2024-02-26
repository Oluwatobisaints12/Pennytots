import { topic } from 'app/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {queryClient} from "app/redux/user/hooks"
import { ICreateCommentDTO, ICreateSubCommentDTO } from './types';

export function useTopics() {
  return useQuery(['topics'], topic.getTopics);
}

export function useSingleTopic(topicId: string) {
  return useQuery(['topic', topicId], () => topic.getSingleTopic(topicId));
}

export function useTopicComments(topicId: string) {
  return useQuery(['topic-comments', topicId], () =>
    topic.getTopicComments(topicId),
  );
}

export function useTopicSubComments(commentId: string) {
  const { data, isLoading: isQueryLoading } = useQuery(
    ['topic-sub-comments', commentId],
    () => topic.getTopicSubComments(commentId!),
    {
      enabled: commentId !== null,
    },
  );

  const isLoading = commentId !== null && isQueryLoading;

  return { data, isLoading };
}

export function useConvos() {
  return useQuery(['convos'], topic.getConvos);
}

export function useCreateComment() {
  return useMutation(
    (payload: ICreateCommentDTO) => {
      return topic.createComment(payload);
    },
    {
      onSuccess: (response: any, variables, context) => {
        queryClient.invalidateQueries(['topic-comments']);
      },
    },
  );
}

export function useCreateSubComment() {
  return useMutation((payload: ICreateSubCommentDTO) => {
    return topic.createSubComment(payload);
  });
}
