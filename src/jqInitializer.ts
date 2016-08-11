///<reference path="../typings/browser.d.ts"/>
module jQInitializer{
    export const EXTRACT_DATA_MODE={
        underscore:"underscore",
        hypen:"hypen",
        camel:"camel"
    };
    export function getDataOptions (element:JQuery,prefix:string,mode?:string){
        //extract data-_attributes with jquery data
        let params = $(element).data();
        let parsedParams = {},
            optPrefix = "opt"+(prefix.charAt(0).toUpperCase() + prefix.slice(1));
        //each param: data-prefix-my-param is prefixMyParam
        for (let key in params) {
            //find prefix
            if(key.search(optPrefix) != -1) {
                //remove prefix: prefixMyParam to myParam
                let parsedKey = key.replace(optPrefix, "");
                //some components require different nomenclatures of letiables
                switch(mode) {
                    case EXTRACT_DATA_MODE.underscore:
                        //myParam to my_param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
                        break;
                    case EXTRACT_DATA_MODE.hypen:
                        //myParam to my-param
                        parsedKey = parsedKey.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                        break;
                    default://camel
                        //myParam
                        parsedKey = parsedKey.charAt(0).toLowerCase().concat(parsedKey.substring(1));
                        break;
                }
                let parsed = params[key];
                //try to parse to JSON
                try {
                    parsed = JSON.parse(parsed);
                } catch (e) {
                }
                parsedParams[parsedKey] = parsed;
            }
        }
        return parsedParams;
    }
    jQuery.fn.getDataOptions = function(prefix,mode){
        let dataOptions = [];
        for (let elemIndex = 0, elementsLength = this.length; elemIndex < elementsLength; elemIndex++) {
            let currentElem = this[elemIndex],
                elemDataOptions = getDataOptions(currentElem,prefix,mode);
            dataOptions.push(elemDataOptions);
        }
        return dataOptions.length == 1 ? dataOptions[0] : dataOptions;
    }
}
