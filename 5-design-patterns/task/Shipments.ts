import { FactoryStrategy } from "./Shippers";
import { IShipmentData } from "./interfaces";

export abstract class Shipment{
    private static idShipment = 1;
    private readonly shipmentId:number;
    weight:number;
    fromAdress:string;
    fromZipCode:string;
    toAddress:string;
    toZipCode:string;

    constructor(data:IShipmentData){
        this.shipmentId = data.ShipmentId || Shipment.getShipmentId();
        this.weight = data.Weight;
        this.fromAdress = data.FromAdress;
        this.fromZipCode = data.FromZipCode;
        this.toAddress = data.ToAddress;
        this.toZipCode = data.ToZipCode;
    }


    static getShipmentId():number{
        return this.idShipment++;
    }

    ship(){
        return `Shipment with the ID ${this.shipmentId} will be picked up from ${this.fromAdress} ${this.fromZipCode} and shipped to  ${this.toAddress} ${this.toZipCode} \nCost = ${this.getCost()}`
    }

    protected getCost(){
        return  FactoryStrategy.create(this.fromZipCode).getCost(this.getInstance());
    }

    abstract getInstance():Shipment;

}

export class Package extends Shipment{
    getInstance(): Shipment {
        return this;
    }

}

export  class Letter extends Shipment{
    getInstance(): Shipment {
        return this;
    }
}

export class Oversize extends Shipment{
    getInstance(): Shipment {
        return this;
    }
}


export class FactoryShipment{

    static createShipment(dataShipment:IShipmentData){
        if(dataShipment.Weight <= 15){
            return new Letter(dataShipment)
        }else if(dataShipment.Weight<=160){
            return new Package(dataShipment);
        }
        return new  Oversize(dataShipment);
    }
}

export class ShipmentDecorator{

    constructor(private wrapperShipment:Shipment){
    }

    ship(){
        return this.wrapperShipment.ship()+"\n**MARK FRAGILE**\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**\n**MARK RETURN RECEIPT REQUESTED**"
    }
}