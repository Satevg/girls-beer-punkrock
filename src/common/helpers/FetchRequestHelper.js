class FetchRequestHelper {
  json = response => {
    return response.json();
  };

  request = (method, url) => {
    return fetch(url, { method: method }).then(this.json);
  };
}

const requestHelper = new FetchRequestHelper();

export default requestHelper;
