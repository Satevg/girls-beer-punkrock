import { API_HOST } from "../constants/app";

class BeerStore {
    constructor() {
        this.data = null;
    }

    request(method, url) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.onload = function(e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    this.data = JSON.parse(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        }.bind(this);
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    createQueryParams(params) {
        return Object.keys(params)
            .map(k => `${k}=${encodeURI(params[k])}`)
            .join("&");
    }

    getFavoriteBeers(ids) {
        let searchFavorites = ids.join("|");
        let url = `${API_HOST}?ids=${searchFavorites}`;
        this.request("GET", url);
        return this.data; // TODO: fix in 'fetch version', can lead to problems if there was error on request
    }

    searchBeers(qs) {
        this.request("GET", `${API_HOST}?${this.createQueryParams(qs)}`);
        return this.data;
    }

    getBeer(id) {
        this.request("GET", `${API_HOST}/${id}`);
        return this.data;
    }
}

const beerStore = new BeerStore();

export default beerStore;
