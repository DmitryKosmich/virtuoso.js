
var VIRTUOSO = (function () {
    'use strict';

    /**
     * Корневой объект фреймворка
     * @type {{VIRTUOSO}}
     * @namespace VIRTUOSO
     */
     var VIRTUOSO = VIRTUOSO || {};

    /**
     *
     * @param ns_string - Область видимости. Вложенность отображается с использование точки. Пример: 'PARENT.modules.module1'
     * @returns {Object} - Возвражает объет, соответствующий строке области видимости.
     */
    VIRTUOSO.namespace = function (ns_string) {
        var parts = ns_string.split('.'),
            parent = VIRTUOSO, i;

        if (parts[0] === 'VIRTUOSO') {
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

    return VIRTUOSO;
})();

console.log(VIRTUOSO);