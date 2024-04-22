import { FactoryShipment, Shipment, ShipmentDecorator } from "./Shipments";

const mockShipmentData = {
    ShipmentId:0,
    Weight:120,
    FromAdress:"Colombia",
    FromZipCode:"12345",
    ToAddress:"United State",
    ToZipCode:"12345"
}

export class Client{

    mockShipment:Shipment;

    constructor(){
        this.mockShipment = FactoryShipment.createShipment(mockShipmentData);
        this.ship();
        this.shipItself();
    }

    ship(){
        console.log(this.mockShipment.ship());
    }

    shipItself(){
        console.log((new ShipmentDecorator(this.mockShipment)).ship());
    }

}