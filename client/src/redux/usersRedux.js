import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getUser = ({user}) => user.login;

// actions
const createActionName = actionName => `app/users/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const logIn = payload => ({ payload, type: LOG_IN });
export const logOut = payload => ({ payload, type: LOG_OUT });

/* INITIAL STATE */
const initialState = {
  login: null,
  requests: {
    pending: false,
    error: null,
    success: null,
},
};

// action creators
const userRedux = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOG_IN: 
      return {...statePart, login: action.payload.login};
    case LOG_OUT:
      return {...statePart, login: null};
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  };
};


export const loadUserRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/auth/user`, { withCredentials: true });
      console.log(res.data);
      if (res.data.loggedIn) {
        dispatch(logIn(res.data.user));
      } else {
        dispatch(logOut());
      }
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest({ error: e.message }));
    }
  };
};


export default userRedux;