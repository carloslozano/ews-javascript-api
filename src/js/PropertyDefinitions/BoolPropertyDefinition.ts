import EwsUtilities = require("../Core/EwsUtilities");

import GenericPropertyDefinition = require("./GenericPropertyDefinition");
class BoolPropertyDefinition extends GenericPropertyDefinition<boolean> {

    ToString(value?: any): string {
        return EwsUtilities.BoolToXSBool(value);      
        //throw new Error("BoolPropertyDefinition.ts - ToString : Not implemented."); 
    }
}

export = BoolPropertyDefinition;
//module Microsoft.Exchange.WebServices.Data {
//}
//import _export = Microsoft.Exchange.WebServices.Data;
//export = _export;
