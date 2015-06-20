(function () {
    'use strict';

    VIRTUOSO.namespace('modules.Parser');

    /**
     *
     * @constructor
     */
    function Parser() {
    }

    /**
     *
     * @param html_string {String} - Строка с HTML для дальнейщего преобразования в JSON
     * @returns {String} - Строка с JSON
     */
    Parser.prototype.toJSON = function (html_string) {
        //TODO:
        return html_string;
    };

    /**
     *
     * @param json_string {String} - Строка с JSON для дальнейщего преобразования в HTML
     * @returns {String} - Строка с HTML
     */
    Parser.prototype.toHTML = function (json_string) {
        //TODO:
        return json_string;
    };

    VIRTUOSO.modules.Parser = new Parser();

})();




