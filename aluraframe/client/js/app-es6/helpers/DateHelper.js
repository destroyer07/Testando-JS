class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
    
    static textoParaData(texto) {
        // 'texto' deve estar no formato aaaa-mm-dd
        if (!/\d{4}-\d{2}-\d{2}/.test(texto))
            throw new Error('A data deve estar no formato aaaa-mm-dd');

        return new Date(...
            texto
                .split('-')
                .map((item, indice) => {
                    // Esse map é necessário para converter o
                    // segundo parâmetro (mês) de 1 a 12 para 0 a 11
                    // pois é assim que é armazenado no objeto
                    if (indice == 1) {
                        return item - 1;
                    }
                    return item;
                }));
    }
}