import { FactoryStrategy } from "./Shippers";
import { IShipmentData } from "./interfaces";

export class Shipment{
    private static idShipment = 1;
    private readonly shipmentId:number;
    protected weight:number;
    protected fromAdress:string;
    protected fromZipCode:string;
    protected toAddress:string;
    protected toZipCode:string;

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
       return `shipment ID ${this.shipmentId} from ${this.fromAdress} to ${this.toAddress} with a cost of ${this.getCost()} ` ; 
    }

    protected getCost(){
        return this.weight* FactoryStrategy.create(this.fromZipCode).getCost();
    }

}