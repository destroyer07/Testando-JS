export class HttpService {

    getES6(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) { // Se a requisição foi concluída
                    if (xhr.status == 200) { // Se a resposta foi OK
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        });
    }

    postES6(url, objeto) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/json');

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) { // Se a requisição foi concluída
                    if (xhr.status == 200) { // Se a resposta foi OK
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send(JSON.stringify(objeto));
        });
    }

    // Requisições utilizando Fetch API inserida no EC7 (ES2016)

    get(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, objeto) {
        return fetch(url,
            {
                headers: { 'Content-type': 'application/json' },
                method: 'post',
                body: JSON.stringify(objeto)
            })
            .then(res => this._handleErrors(res))
    }

    _handleErrors(res) {
        if (!res.ok)
            throw new Error(res.statusText);
        return res;
    }
}