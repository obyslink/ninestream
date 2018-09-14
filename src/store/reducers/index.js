import { combineReducers } from 'redux';
import routeReducer from './routeReducer';
import communityReducer from './communityReducers';
import userReducers from './userReducers';

const appReducer = combineReducers({
  route: routeReducer,
  community: communityReducer,
  user: userReducers,
});

export default appReducer;