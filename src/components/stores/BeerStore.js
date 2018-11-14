import { API_HOST } from "../constants/app";
import requestHelper from "../helpers/HttpRequestHelper";

class BeerStore {
    constructor() {
        this.httpHelper = requestHelper;
    }

    _createQueryParamsFromDict(params) {
        return Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join("&");
    }

    getFavoriteBeers(ids) {
        let searchFavorites = ids.join("|");
        return this.httpHelper.request("GET", `${API_HOST}?ids=${searchFavorites}`);
    }

    searchBeers(qs) {
        return this.httpHelper.request("GET", `${API_HOST}?${this._createQueryParamsFromDict(qs)}`);
    }

    getBeer(id) {
        return this.httpHelper.request("GET", `${API_HOST}/${id}`);
    }
}

const beerStore = new BeerStore();

export default beerStore;
