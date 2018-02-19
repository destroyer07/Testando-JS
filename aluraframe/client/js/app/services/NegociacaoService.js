'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoesSemana',
        value: function obterNegociacoesSemana() {

            return this._http.get('negociacoes/semana').then(function (negociacoes) {
                return negociacoes.map(function (obj) {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações dessa semana');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaAnterior',
        value: function obterNegociacoesSemanaAnterior() {

            return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                return negociacoes.map(function (obj) {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana anterior');
            });
        }
    }, {
        key: 'obterNegociacoesSemanaRetrasada',
        value: function obterNegociacoesSemanaRetrasada() {

            return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                return negociacoes.map(function (obj) {
                    return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana retrasada');
            });
        }
    }, {
        key: 'enviarNegociacao',
        value: function enviarNegociacao(negociacao) {
            return this._http.post('/negociacoes', {
                data: DateHelper.dataParaTexto(negociacao.data),
                quantidade: negociacao.quantidade,
                valor: negociacao.valor
            }).then(function (resposta) {
                return resposta;
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível enviar a negociação');
            });
        }
    }, {
        key: 'cadastra',
        value: function cadastra(negociacao) {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function () {
                return 'Negociação adicionada com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível listar as negociações');
            });
        }
    }, {
        key: 'apaga',
        value: function apaga() {
            return ConnectionFactory.getConnection().then(function (connection) {
                return new NegociacaoDao(connection);
            }).then(function (dao) {
                return dao.apagaTodos();
            }).then(function () {
                return 'Negociações apagadas com sucesso';
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaAtual) {
            return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (arrayDeArraysDeResposta) {
                return arrayDeArraysDeResposta.reduce(function (negociacoes, arrayDeResposta) {
                    return negociacoes.concat(arrayDeResposta);
                }, []).filter(function (negociacao) {
                    return !listaAtual.some(function (negociacaoExistente) {
                        return negociacao.ehIgual(negociacaoExistente);
                    });
                });
            }).catch(function (erro) {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações');
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map