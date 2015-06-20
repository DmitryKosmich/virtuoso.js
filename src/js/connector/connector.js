(function () {
    'use strict';

    VIRTUOSO.namespace('modules.Connector');

    /**
     *
     * @constructor
     */
    function Connector() {
        this.socket = null;
    }

    /**
     *
     * @param url {String} Андрес для подключения указывается без протокола
     */
    Connector.prototype.connect = function (url) {
        this.socket = new WebSocket('ws://' + url);
    };

    /**
     *
     * @param callback {Function}
     */
    Connector.prototype.setOnClose = function (callback) {
        this.socket.onclose = callback;
    };

    /**
     *
     * @param callback {Function} - Функция для обрабоки события установки соеденения. В ее передается объект события.
     */
    Connector.prototype.setOnOpen = function (callback) {
        this.socket.onopen = callback;
    };

    /**
     *
     * @param callback {Function} - Функция для обрабоки сообщений, прихоящих с сервера. В ее передается объект события с данными.
     */
    Connector.prototype.setOnMessage = function (callback) {
        this.socket.onmessage = callback;
    };

    /**
     *
     * @param callback {Function} - Функция для обрабоки ошибок. В ее передается объект с информацией об ошибке.
     */
    Connector.prototype.setOnError = function (callback) {
        this.socket.oneror = callback;
    };

    /**
     *
     * @param data - Данные для отправки на сервер
     */
    Connector.prototype.send = function (data) {
        this.socket.send(data);
    };

    VIRTUOSO.modules.Connector = new Connector();

})();

