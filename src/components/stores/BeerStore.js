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

    getBeers(qs) {
        let url = `${API_HOST}/beers?per_page=${qs.limit}&page=${qs.page}`;
        this.request("GET", url);
        return this.data;
    }

    getFavoriteBeers(ids) {
        console.log("REQ");
        let searchFavorites = ids.join("|");
        let url = `${API_HOST}/beers?ids=${searchFavorites}`;
        this.request("GET", url);
        return this.data;
    }
}

const beerStore = new BeerStore();

export default beerStore;
