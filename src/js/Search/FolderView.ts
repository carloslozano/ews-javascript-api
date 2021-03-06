import {OffsetBasePoint} from "../Enumerations/OffsetBasePoint";
import {FolderTraversal} from "../Enumerations/FolderTraversal";
import {ExchangeService} from "../Core/ExchangeService";
import {XmlElementNames} from "../Core/XmlElementNames";
import {XmlAttributeNames} from "../Core/XmlAttributeNames";
import {ServiceObjectType} from "../Enumerations/ServiceObjectType";
import {EwsServiceXmlWriter} from "../Core/EwsServiceXmlWriter";
import {PagedView} from "./PagedView";
/**
 * Represents the view settings in a folder search operation.
 *
 */
export class FolderView extends PagedView {
    private traversal: FolderTraversal = FolderTraversal.Shallow;
    /**
     * Gets or sets the search traversal mode. Defaults to FolderTraversal.Shallow.
     *
     */
    get Traversal(): FolderTraversal {
        return this.traversal;
    }
    set Traversal(value: FolderTraversal) {
        this.traversal = value;
    }
    /**
     * Initializes a new instance of the **FolderView** class.
     *
     * @param   {number}   pageSize          The maximum number of elements the search operation should return.
     */
    constructor(pageSize: number);
    /**
     * Initializes a new instance of the **FolderView** class.
     *
     * @param   {number}   pageSize          The maximum number of elements the search operation should return.
     * @param   {number}   offset            The offset of the view from the base point.
     */
    constructor(pageSize: number, offset: number);
    /**
     * Initializes a new instance of the **FolderView** class.
     *
     * @param   {number}   pageSize          The maximum number of elements the search operation should return.
     * @param   {number}   offset            The offset of the view from the base point.
     * @param   {number}   offsetBasePoint   The base point of the offset.
     */
    constructor(pageSize: number, offset: number, offsetBasePoint: OffsetBasePoint);
    constructor(pageSize: number, offset?: number, offsetBasePoint?: OffsetBasePoint) {
        super(pageSize, offset, offsetBasePoint);        
    }
    //AddJsonProperties(jsonRequest: any/*JsonObject*/, service: ExchangeService): any { throw new Error("FolderView.ts - AddJsonProperties : Not implemented."); }
    /**
     * Gets the type of service object this view applies to.
     *
     * @return  {ServiceObjectType}      A ServiceObjectType value.
     */
    GetServiceObjectType(): ServiceObjectType { return ServiceObjectType.Folder; }
    //GetViewJsonTypeName(): string { throw new Error("FolderView.ts - GetViewJsonTypeName : Not implemented."); }
    /**
     * Gets the name of the view XML element.
     *
     * @return  {type}      XML element name.
     */
    GetViewXmlElementName(): string { return XmlElementNames.IndexedPageFolderView; }
    /**
     * Writes the attributes to XML.
     *
     * @param   {EwsServiceXmlWriter}   writer   The writer.
     */
    WriteAttributesToXml(writer: EwsServiceXmlWriter): void { writer.WriteAttributeValue(XmlAttributeNames.Traversal, FolderTraversal[this.Traversal]); }
}
