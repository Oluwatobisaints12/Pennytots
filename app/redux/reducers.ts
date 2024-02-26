import { combineReducers } from 'redux';
import user from 'app/redux/user/reducer';
import main from 'app/redux/main/reducer';

export const reducers = combineReducers({
  user,
  main
});
