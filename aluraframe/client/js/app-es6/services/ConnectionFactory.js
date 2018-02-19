
var ConnectionFactory = (function () {

    const stores = ['negociacoes'];
    const dbVersion = 2;
    const dbName = 'testedb';

    var connection = null;

    var close = null;

    return class ConnectionFactory {

        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, dbVersion);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão!');
                        };
                    }

                    resolve(e.target.result);
                };

                openRequest.onerror = e => {
                    console.log(e.target, error);
                    reject(e.target.error.name);
                };


            });
        }

        static _createStores(conn) {
            stores.forEach(store => {
                if (conn.objectStoreNames.contains(store))
                    conn.result.deleteObjectStore(store);

                conn.createObjectStore(store, { autoIncrement: true });
            });
        }

        static closeConnection() {
            if (connection) {
                close();
                connection = null;
            }
        }
    }

})();