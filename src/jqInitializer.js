///<reference path="../typings/browser.d.ts"/>
var jQInitializer;
(function (jQInitializer) {
    jQInitializer.EXTRACT_DATA_MODE = {
        underscore: "underscore",
        hypen: "hypen",
        camel: "camel"
    };
    function getDataOptions(element, prefix, mode) {
        //extract data-_attributes with jquery data
        var params = $(element).data();
        var parsedParams = {}, optPrefix = "opt" + (prefix.charAt(0).toUpperCase() + prefix.slice(1));
        //each param: data-prefix-my-param is prefixMyParam
        for (var key in params) {
            //find prefix
            if (key.search(optPrefix) != -1) {
                //remove prefix: prefixMyParam to myParam
                var parsedKey = key.replace(optPrefix, "");
                //some components require different nomenclatures of letiables
                switch (mode) {
                    case jQInitializer.EXTRACT_DATA_MODE.underscore:
                        //myParam to my_param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        break;
                    case jQInitializer.EXTRACT_DATA_MODE.hypen:
                        //myParam to my-param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        break;
                    default:
                        //myParam
                        parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                        break;
                }
                var parsed = params[key];
                //try to parse to JSON
                try {
                    parsed = JSON.parse(parsed);
                }
                catch (e) {
                }
                parsedParams[parsedKey] = parsed;
            }
        }
        return parsedParams;
    }
    jQInitializer.getDataOptions = getDataOptions;
    jQuery.fn.getDataOptions = function (prefix, mode) {
        var dataOptions = [];
        for (var elemIndex = 0, elementsLength = this.length; elemIndex < elementsLength; elemIndex++) {
            var currentElem = this[elemIndex], elemDataOptions = getDataOptions(currentElem, prefix, mode);
            dataOptions.push(elemDataOptions);
        }
        return dataOptions.length == 1 ? dataOptions[0] : dataOptions;
    };
})(jQInitializer || (jQInitializer = {}));
