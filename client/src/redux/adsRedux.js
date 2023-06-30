import axios from 'axios';
import { API_URL } from '../config';

//selectors
export const getAds = ({ads}) => ads.data;
export const getAdById = ({ads}, id) => ads.data.find(ad => ad._id === id);
export const getAdsBySearch = ({ads}, searchPhrase)  => ads.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()));
// actions
const createActionName = actionName => `app/ads/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const editAd = payload => ({ payload, type: EDIT_AD });
export const removeAd = payload => ({ payload, type: REMOVE_AD });

/* INITIAL STATE */
const initialState = {
  data: [],
  requests: {},
};

// action creators
const adsRedux = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS: 
      return { ...statePart, data: [...action.payload] };
    case ADD_AD: 
      return { ...statePart, data: [...statePart.data, action.payload] }
    case EDIT_AD: 
      return { ...statePart, data: statePart.map(ad => (ad.id === action.payload.id ? {...ad, ...action.payload} : ad)) }
    case REMOVE_AD: 
      return { ...statePart, data: statePart.filter(ad => (ad.data._id !== action.payload.id)) }
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  };
};

// thunk

export const loadAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {

      let res = await axios.get(`${API_URL}/api/ads`);
      console.log(res.data);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: 'LOAD_ADS' }));

    } catch(e) {
      dispatch(errorRequest({ name: 'LOAD_ADS' ,error: e.message}));
    }

  };
};



export const addAdsRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_AD' }));

    try {
      const formData = new FormData();
      formData.append('title', ad.title);
      formData.append('content', ad.content);
      formData.append('date', ad.date);
      formData.append('price', ad.price);
      formData.append('location', ad.location);
      formData.append('image', ad.image);
      formData.append('user', ad.user);

      const response = await axios.post(`${API_URL}/api/ads`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(addAd(response.data));
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (error) {
      dispatch(errorRequest({ name: 'ADD_AD', error: error.message }));
    }
  };
};

export const editAdsRequest = (ad, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'EDIT_AD' }));
    try {
      const formData = new FormData();
      formData.append('title', ad.title);
      formData.append('content', ad.content);
      formData.append('date', ad.date);
      formData.append('price', ad.price);
      formData.append('location', ad.location);
      formData.append('image', ad.image);
      formData.append('user', ad.user);

      let res = await axios.put(`${API_URL}/api/ads/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      dispatch(editAd(res.data));
      dispatch(endRequest({ name: 'EDIT_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'EDIT_AD', error: e.message }));
    }
  };
};

export const removeAdsRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REMOVE_AD' }));
    try {
       await axios.delete(`${API_URL}/api/ads/${id}`, { withCredentials: true });
      dispatch(removeAd(id));
      dispatch(endRequest({ name: 'REMOVE_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'REMOVE_AD', error: e.message }));
    }
  };
};


export default adsRedux;