'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        var tabelaNegociacoes = $('#negociacoesView');

        if (tabelaNegociacoes) {
            this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView(tabelaNegociacoes), 'adiciona', 'limpa', 'ordena', 'inverte');
        }

        this._service = new NegociacaoService();

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._ordemAtual = '';

        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            // Carrega negociacoes do banco para o modelo
            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (erro) {
                return _this._mensagem.texto = erro;
            });

            // Importa as negociacoes do servidor a cada 3 segundos
            setInterval(function () {
                return _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._mensagem.texto = mensagem;
                _this2._limpaFormulario();
            }).catch(function (erro) {
                return _this2._mensagem.texto = erro;
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            var _this3 = this;

            this._service.apaga().then(function (mensagem) {
                _this3._mensagem.texto = mensagem;
                _this3._listaNegociacoes.limpa();
            }).catch(function (erro) {
                return _this3._mensagem.texto = erro;
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this4 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    return _this4._listaNegociacoes.adiciona(negociacao);
                });
                _this4._mensagem.texto = 'Negocições importadas com sucesso';
            }).catch(function (erro) {
                return _this4._mensagem.texto = erro;
            });
        }
    }, {
        key: 'enviaNegociacao',
        value: function enviaNegociacao(event) {
            var _this5 = this;

            event.preventDefault();

            this._service.enviarNegociacao(this._criaNegociacao()).catch(function (erro) {
                return _this5._mensagem.texto = erro;
            }).then(this._mensagem.texto = 'Negociacao enviada com sucesso');
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {
            if (this._ordemAtual == coluna) {
                this._listaNegociacoes.inverte();
            } else {
                this._listaNegociacoes.ordena(function (a, b) {
                    return a[coluna] - b[coluna];
                });
                this._ordemAtual = coluna;
            }
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map