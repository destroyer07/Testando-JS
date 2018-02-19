import {Negociacao} from '../models/Negociacao'
import {HttpService} from './HttpService'
import {DateHelper} from '../helpers/DateHelper'

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {

        return this._http
            .get('negociacoes/semana')
            .then((negociacoes) =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações dessa semana');
            });
    }

    obterNegociacoesSemanaAnterior() {

        return this._http
            .get('negociacoes/anterior')
            .then((negociacoes) =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana anterior');
            });
    }

    obterNegociacoesSemanaRetrasada() {

        return this._http
            .get('negociacoes/retrasada')
            .then((negociacoes) =>
                negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor))
            )
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações da semana retrasada');
            });
    }

    enviarNegociacao(negociacao) {
        return this._http
            .post('/negociacoes', {
                data: DateHelper.dataParaTexto(negociacao.data),
                quantidade: negociacao.quantidade,
                valor: negociacao.valor
            })
            .then(resposta => resposta)
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível enviar a negociação');
            });
    }

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação');
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível listar as negociações');
            });
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return Promise
            .all([
                this.obterNegociacoesSemana(),
                this.obterNegociacoesSemanaAnterior(),
                this.obterNegociacoesSemanaRetrasada()])
            .then(arrayDeArraysDeResposta => 
                arrayDeArraysDeResposta
                    .reduce((negociacoes, arrayDeResposta) => negociacoes.concat(arrayDeResposta), [])
                    .filter(negociacao =>
                        !listaAtual.some(negociacaoExistente =>
                            negociacao.ehIgual(negociacaoExistente))))
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível importar as negociações');
            })
    }
}