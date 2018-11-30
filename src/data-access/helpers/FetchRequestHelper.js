const request = (method, url) => fetch(url, { method }).then(response => response.json());

export default {
    request
};
