class ListaNegociacoes {
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao)
    }

    limpa() {
        this._negociacoes = [];
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);
    }

    inverte() {
        this._negociacoes.reverse();
    }

    get negociacoes() {
        // Retorna uma nova lista com as negociacoes
        // para que não haja alteração dela fora dessa classe
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, item) => total + item.volume, 0.0);
    }
}