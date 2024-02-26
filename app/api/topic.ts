import { ICreateCommentDTO, ICreateSubCommentDTO } from 'app/redux/topic/types';
import { Axios } from './axios';

const getTopics = async () => {
  const { data } = await Axios.get('/topics/getTopics?page=1&limit=50');
  return data.topics.docs;
};

//Convos
const getConvos = async () => {
  const { data } = await Axios.get('/topics/get-convos?page=1&limit=50');
  return data.topics.docs;
};

const removeFromConvos = async (topicId: string) => {
  const { data } = await Axios.delete(
    '/topics/remove-topic-from-convos/' + topicId,
  );
  return data;
};

const getSingleTopic = async (topicId: string) => {
  const { data } = await Axios.get('/topics/viewTopic/' + topicId);
  return data.topic;
};

const editTopic = async (topicId: string, payload: any) => {
  const { data } = await Axios.post('/topics/edit-topic/' + topicId, payload);
  return data;
};

const getTopicComments = async (topicId: string) => {
  const { data } = await Axios.get(
    '/topics/view-topic-comments/' + topicId + '?page=1&limit=10',
  );
  return data.comments.docs;
};

const getTopicSubComments = async (commentId: string) => {
  const { data } = await Axios.get(
    '/topics/view-topic-sub-comments/' + commentId + '?page=1&limit=10',
  );
  return data.comments.docs;
};

const likeTopic = async (topicId: string) => {
  const { data } = await Axios.post('/topics/likeTopic/' + topicId);
  return data;
};

const createComment = async (payload: ICreateCommentDTO) => {
  const { data } = await Axios.post(
    '/topics/create-comment/' + payload.postId,
    payload.data,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );

  return data;
};

const createSubComment = async (payload: ICreateSubCommentDTO) => {
  const { data } = await Axios.post(
    '/topics/create-topic-sub-comment/' + payload.commentId,
    payload.data,
  );
  return data;
};

const reportTopic = async (topicId: string,description: string) =>{
  const { data } = await Axios.post('/topics/flag/' + topicId, {description});

  return data;
}

const reportSubComments = async (commentId: string,description: string) =>{
  const { data } = await Axios.post('/topics/flag-comment/' + commentId, {description});

  return data;
}

export const topic = {
  getTopics,
  getConvos,
  removeFromConvos,
  getSingleTopic,
  editTopic,
  getTopicComments,
  getTopicSubComments,
  likeTopic,
  createComment,
  createSubComment,
  reportTopic,
  reportSubComments
};
