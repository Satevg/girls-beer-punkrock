class FetchRequestHelper {
    json = response => response.json();

    request = (method, url) => fetch(url, { method }).then(this.json);
}

const requestHelper = new FetchRequestHelper();

export default requestHelper;
