import { Shipment } from "./Shipment";

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
        this.mockShipment = new Shipment(mockShipmentData);
    }

    ship(){
        console.log(this.mockShipment.ship());
    }

}