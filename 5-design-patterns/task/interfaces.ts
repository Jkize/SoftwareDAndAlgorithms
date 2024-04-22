import { Shipment } from "./Shipments";

export interface IShipmentData{
    ShipmentId:number;
    Weight:number;
    FromAdress:string;
    FromZipCode:string;
    ToAddress:string;
    ToZipCode:string;
}

export interface IShipper{
    getCost(shipment:Shipment):number;
}