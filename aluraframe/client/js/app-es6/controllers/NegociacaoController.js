class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let tabelaNegociacoes = $('#negociacoesView');

        if (tabelaNegociacoes) {
            this._listaNegociacoes = new Bind(
                new ListaNegociacoes(),
                new NegociacoesView(tabelaNegociacoes),
                'adiciona', 'limpa', 'ordena', 'inverte');
        }

        this._service = new NegociacaoService();

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');


        this._ordemAtual = '';

        this._init();
    }

    _init() {
        // Carrega negociacoes do banco para o modelo
        this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro);

        // Importa as negociacoes do servidor a cada 3 segundos
        setInterval(() => this.importaNegociacoes(), 3000);
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch(erro => this._mensagem.texto = erro);
    };

    apaga() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.limpa();
            })
            .catch(erro => this._mensagem.texto = erro);
    };

    importaNegociacoes() {
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = 'Negocições importadas com sucesso';
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    enviaNegociacao(event) {
        event.preventDefault();

        this._service
            .enviarNegociacao(this._criaNegociacao())
            .catch(erro => this._mensagem.texto = erro)
            .then(this._mensagem.texto = 'Negociacao enviada com sucesso');
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {
            this._listaNegociacoes.inverte();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
            this._ordemAtual = coluna;
        }
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}