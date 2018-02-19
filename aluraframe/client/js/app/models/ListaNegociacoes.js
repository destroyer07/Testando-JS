"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNegociacoes = function () {
    function ListaNegociacoes(armadilha) {
        _classCallCheck(this, ListaNegociacoes);

        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    _createClass(ListaNegociacoes, [{
        key: "adiciona",
        value: function adiciona(negociacao) {
            this._negociacoes.push(negociacao);
        }
    }, {
        key: "limpa",
        value: function limpa() {
            this._negociacoes = [];
        }
    }, {
        key: "ordena",
        value: function ordena(criterio) {
            this._negociacoes.sort(criterio);
        }
    }, {
        key: "inverte",
        value: function inverte() {
            this._negociacoes.reverse();
        }
    }, {
        key: "negociacoes",
        get: function get() {
            // Retorna uma nova lista com as negociacoes
            // para que não haja alteração dela fora dessa classe
            return [].concat(this._negociacoes);
        }
    }, {
        key: "volumeTotal",
        get: function get() {
            return this._negociacoes.reduce(function (total, item) {
                return total + item.volume;
            }, 0.0);
        }
    }]);

    return ListaNegociacoes;
}();
//# sourceMappingURL=ListaNegociacoes.js.map