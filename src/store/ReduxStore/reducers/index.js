import {
  ADD_BEERS,
  CLEAR_BEERS,
  SET_BEERS,
  SET_LOADING
} from '../actions/action-types';

const initialState = {
  beers: [],
  isLoading: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BEERS:
      return { ...state, beers: action.payload };
    case ADD_BEERS:
      return { ...state, beers: [...state.beers, ...action.payload] };
    case CLEAR_BEERS:
      return { ...state, beers: [] };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
export default rootReducer;
