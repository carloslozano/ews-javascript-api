import IOutParam = require("../Interfaces/IOutParam");
import ExchangeVersion = require("../Enumerations/ExchangeVersion");
import EwsServiceXmlReader = require("../Core/EwsServiceXmlReader");
import EwsServiceXmlWriter = require("../Core/EwsServiceXmlWriter");
import PropertyDefinitionFlags = require("../Enumerations/PropertyDefinitionFlags");
import PropertyBag = require("../Core/PropertyBag");
import ExchangeService = require("../Core/ExchangeService");
import ServiceObject = require("../Core/ServiceObjects/ServiceObject");
import ComplexProperty = require("../ComplexProperties/ComplexProperty");
import {TypeSystem} from "../ExtensionMethods";

import PropertyDefinition = require("./PropertyDefinition");
class ComplexPropertyDefinitionBase extends PropertyDefinition {

    constructor(
        propertyName: string,
        xmlElementName: string,
        version: ExchangeVersion,
        uri?: string,
        flags?: PropertyDefinitionFlags) {
        super(propertyName, xmlElementName, version, uri, flags);
    }

    CreatePropertyInstance(owner: ServiceObject): ComplexProperty { throw new Error("ComplexPropertyDefinitionBase.ts - CreatePropertyInstance : Abstract method - Not implemented."); }
    GetPropertyInstance(propertyBag: PropertyBag, complexProperty: IOutParam<ComplexProperty>): boolean {
        complexProperty.outValue = null;
        if (!propertyBag.TryGetValue(this, complexProperty) || !this.HasFlag(PropertyDefinitionFlags.ReuseInstance, propertyBag.Owner.Service.RequestedServerVersion)) {
            complexProperty.outValue = this.CreatePropertyInstance(propertyBag.Owner);
            return true;
        }

        return false;
    }
    InternalLoadCollectionFromJson(jsonCollection: any, service: ExchangeService, propertyBag: PropertyBag): any { throw new Error("ComplexPropertyDefinitionBase.ts - InternalLoadCollectionFromJson : Not implemented."); }
    InternalLoadFromJson(jsonObject: any /*JsonObject*/, service: ExchangeService, propertyBag: PropertyBag): any { throw new Error("ComplexPropertyDefinitionBase.ts - InternalLoadFromJson : Not implemented."); }
    InternalLoadFromXmlJsObject(jsObject: any, service: ExchangeService, propertyBag: PropertyBag): any {

        var outComplexproperty: IOutParam<ComplexProperty> = { outValue: null };
        var justCreated: boolean = this.GetPropertyInstance(propertyBag, outComplexproperty);

        if (!justCreated && this.HasFlag(PropertyDefinitionFlags.UpdateCollectionItems, propertyBag.Owner.Service.RequestedServerVersion)) {
            outComplexproperty.outValue.UpdateFromXmlJsObject(jsObject, null /*reader.LocalName*/);
        }
        else {
            //var typename = TypeSystem.GetJsObjectTypeName(jsObject);
            outComplexproperty.outValue.LoadFromXmlJsObject(jsObject, null);
        }

        propertyBag._setItem(this, outComplexproperty.outValue);
    }
    //LoadPropertyValueFromJson(value: any, service: ExchangeService, propertyBag: PropertyBag): any { throw new Error("ComplexPropertyDefinitionBase.ts - LoadPropertyValueFromJson : Not implemented."); }
    LoadPropertyValueFromXmlJsObject(jsObject: any, service: ExchangeService, propertyBag: PropertyBag): any {
        this.InternalLoadFromXmlJsObject(jsObject, service, propertyBag);
        
        //    reader.EnsureCurrentNodeIsStartElement(XmlNamespace.Types, this.XmlElementName);
        //
        //if (!reader.IsEmptyElement || reader.HasAttributes)
        //{
        //    this.InternalLoadFromXml(reader, propertyBag);
        //}
        //
        //reader.ReadEndElementIfNecessary(XmlNamespace.Types, this.XmlElementName);
    }
    //WriteJsonValue(jsonObject: any /*JsonObject*/, propertyBag: PropertyBag, service: ExchangeService, isUpdateOperation: boolean): any { throw new Error("ComplexPropertyDefinitionBase.ts - WriteJsonValue : Not implemented."); }
    WritePropertyValueToXml(writer: EwsServiceXmlWriter, propertyBag: PropertyBag, isUpdateOperation: boolean): void {

        var complexProperty: ComplexProperty = <ComplexProperty> propertyBag._getItem(this);
        debugger;
        if (complexProperty != null || typeof complexProperty !== 'undefined') {
            complexProperty.WriteToXml(writer, this.XmlElementName);
        } 
        //throw new Error("ComplexPropertyDefinitionBase.ts - WritePropertyValueToXml : Not implemented."); 
    }
}
export = ComplexPropertyDefinitionBase
