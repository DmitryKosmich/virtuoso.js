var VIRTUOSO = (function (document, io) {
    'use strict';
    /**
     * Имя фреймворка
     * @type {string}
     */
    var FW_NAME = 'VIRTUOSO';

    /**
     *
     * @namespace VIRTUOSO - Корневой объект фреймворка
     */
    var VIRTUOSO = VIRTUOSO || {};

    /**
     *
     * @type {{VERSION: string, SOCKET_URL: string}}
     */
    VIRTUOSO._constants = {
        VERSION: '1.0.0',
        SOCKET_URL: 'http://localhost:3000/'
    };

    /**
     *
     * @param ns_string - Область видимости. Вложенность отображается с использование точки. Пример: 'PARENT.modules.Module1'
     * @protected
     * @returns {Object} - Возвражает объет, соответствующий строке области видимости.
     */
    VIRTUOSO._namespace = function (ns_string) {
        var parts = ns_string.split('.'),
            parent = VIRTUOSO, i;

        if (parts[0] === FW_NAME) {
            parts = parts.slice(1);
        }

        for (i = 0; i < parts.length; i += 1) {
            if (typeof parent[parts[i]] === 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };

    /**
     *
     * @param html {String} - Строка с HTML для дальнейщего преобразования в JSON
     * @returns {String}
     * @protected
     */
    VIRTUOSO._toJSON = function (html) {
        //TODO:
        return html;
    };

    /**
     *
     * @param json {String} - Строка с JSON для дальнейщего преобразования в HTML
     * @param prevResult {String} - Параметр для поддержки рекурсии
     * @returns {String}
     * @protected
     */
    VIRTUOSO._toHTML = function (json, prevResult) {

        /**
         *
         * @param attributes {Array}
         * @returns {string}
         */
        var attributesToHTMLString = function (attributes) {
            var result = '',
                length = attributes ? attributes.length : 0,
                i;
            for (i = 0; i < length; i += 1) {
                result += attributes[i].name + '="' + attributes[i].value + '" ';
            }
            return result;
        };

        /**
         *
         * @param classes {Array}
         * @returns {string}
         */
        var classesToHTMLString = function (classes) {
            var result = '',
                length = classes ? classes.length : 0,
                i;
            for (i = 0; i < length; i += 1) {
                result += classes[i] + ' ';
            }
            return result;
        };

        /**
         *
         * @param styles {Array}
         * @returns {string}
         */
        var stylesToHTMLString = function (styles) {
            var result = styles ? 'class="' : '',
                length = styles ? styles.length : 0,
                i;
            for (i = 0; i < length; i += 1) {
                result += styles[i].name + '=' + styles[i].value + '; ';
            }
            result += styles ? '" ' : '';
            return result;
        };

        /**
         *
         * @param events {Array}
         * @returns {string}
         */
        var eventsToHTMLString = function (events) {
            var result = '',
                length = events ? events.length : 0,
                i;
            for (i = 0; i < length; i += 1) {
                result += events[i].name + '="' + events[i].value.name + '(event, ';
                var paramsLength = events[i].value.params.length,
                    j;
                for (j = 0; j < paramsLength; j += 1) {
                    result +=  + (j === 0 ? '' : ', ') + events[i].value.params[j];
                }
                result += '); '
            }
            return result;
        };

        /**
         *
         * @param text {string}
         * @param children {Array}
         * @returns {string}
         */
        var childToString = function (text, children) {
            var result = '';
            //TODO:
            return result;
        };

        var object = JSON.parse(json);
        var result = prevResult ? prevResult : '';
        result += '<' + object.name + ' ';
        result += attributesToHTMLString(object.attributes);
        result += classesToHTMLString(object.classes);
        result += stylesToHTMLString(object.styles);
        result += eventsToHTMLString(object.events);
        result += '>';
        result += childToString(object.text, object.children);
        result += '</' + object.name + '>';
        return result;
    };


    VIRTUOSO._namespace('modules.Dom');

    /**
     *
     * @constructor
     */
    function Dom() {
    }

    /**
     *
     * @param json - json для отображения на странице
     */
    Dom.prototype.insert = function (json) {
        var parser = new DOMParser(),
        object = JSON.parse(json),
        html = VIRTUOSO._toHTML(json),
        doc = parser.parseFromString(html, 'text/xml'),
        elem = document.getElementById(object.sc_addr);
        if (elem) {
            elem.parentNode.replaceChild(doc, elem);
        } else {
            document.body.innerHTML += html;
        }
    };

    VIRTUOSO.modules.Dom = new Dom();

    /**
     *
     * @param data {String} - Обновления, приходящие с сервера
     * @protected
     */
    VIRTUOSO._onSeverMessage = function (data) {
        console.debug('=> _onSeverMessage()', data);
        VIRTUOSO.modules.Dom.insert(data);
    };

    var socket = VIRTUOSO._namespace('modules.Connector.Socket');
    socket = io(VIRTUOSO._constants.SOCKET_URL);
    socket.on('server', VIRTUOSO._onSeverMessage);


    return VIRTUOSO;
})(document, io);

