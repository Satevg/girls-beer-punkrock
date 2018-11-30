import { API_HOST } from '../../common/constants/app';
import httpHelper from '../helpers/FetchRequestHelper';

const createQueryParamsFromDict = params =>
    Object.keys(params)
        .map(k => `${k}=${encodeURI(params[k])}`)
        .join('&');

const getBeer = id => httpHelper.request('GET', `${API_HOST}/${id}`);

const searchBeers = qs => httpHelper.request('GET', `${API_HOST}?${createQueryParamsFromDict(qs)}`);

const getFavoriteBeers = ids => httpHelper.request('GET', `${API_HOST}?ids=${ids.join('|')}`);

export default {
    getBeer,
    searchBeers,
    getFavoriteBeers
};
