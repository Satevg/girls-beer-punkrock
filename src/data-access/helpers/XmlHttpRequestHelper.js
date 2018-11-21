class HttpRequestHelper {
    request = (method, url) =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.statusText);
                    }
                }
            };
            xhr.onerror = () => {
                reject(new Error(`${xhr.status} - ${xhr.text}`));
            };
            xhr.send();
        });
}

const requestHelper = new HttpRequestHelper();

export default requestHelper;
