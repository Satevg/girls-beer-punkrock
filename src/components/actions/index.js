import { ADD_BEERS, CLEAR_BEERS, SET_BEERS, SET_LOADING } from "../constants/action-types";

export const setBeers = beers => ({ type: SET_BEERS, payload: beers });
export const addBeers = beers => ({ type: ADD_BEERS, payload: beers });
export const clearBeers = () => ({ type: CLEAR_BEERS });
export const setLoading = isLoading => ({ type: SET_LOADING, payload: isLoading });
