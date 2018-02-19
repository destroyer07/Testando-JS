'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService() {
        _classCallCheck(this, HttpService);
    }

    _createClass(HttpService, [{
        key: 'getES6',
        value: function getES6(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', url);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        // Se a requisição foi concluída
                        if (xhr.status == 200) {
                            // Se a resposta foi OK
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(xhr.responseText);
                        }
                    }
                };

                xhr.send();
            });
        }
    }, {
        key: 'postES6',
        value: function postES6(url, objeto) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        // Se a requisição foi concluída
                        if (xhr.status == 200) {
                            // Se a resposta foi OK
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

    }, {
        key: 'get',
        value: function get(url) {
            var _this = this;

            return fetch(url).then(function (res) {
                return _this._handleErrors(res);
            }).then(function (res) {
                return res.json();
            });
        }
    }, {
        key: 'post',
        value: function post(url, objeto) {
            var _this2 = this;

            return fetch(url, {
                headers: { 'Content-type': 'application/json' },
                method: 'post',
                body: JSON.stringify(objeto)
            }).then(function (res) {
                return _this2._handleErrors(res);
            });
        }
    }, {
        key: '_handleErrors',
        value: function _handleErrors(res) {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        }
    }]);

    return HttpService;
}();
//# sourceMappingURL=HttpService.js.map