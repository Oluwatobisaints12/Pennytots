import { IncreaseOrReduce} from 'app/redux/quiz/types';
import { Axios } from './axios';
import { REDUCE_PENNYTOTS } from 'app/Data/constants';
import { INCREASE_PENNYTOTS } from 'app/Data/constants';


const getQuestions = async () => {
  const { data } = await Axios.get('/quiz/random');
  return data;
};

//deduct Pennytot
const changeUserPennyTots = async (type:"reduce" | "increase") => {
  if (type === 'reduce'){
    const { data } = await Axios.get(`/quiz/reduce/${REDUCE_PENNYTOTS}`);
    return data;
  }
  if (type === 'increase'){
    const { data } = await Axios.get(`/quiz/increase/${INCREASE_PENNYTOTS}`);
    return data;
  }
};


export const quiz = {
  getQuestions,
  changeUserPennyTots
};
