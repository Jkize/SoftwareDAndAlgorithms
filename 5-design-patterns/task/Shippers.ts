import { Letter, Oversize, Package, Shipment } from "./Shipments";
import { IShipper } from "./interfaces";

export class AirEastShipper implements IShipper{
    getCost(shipment:Shipment): number {
        if(shipment instanceof Letter){
            return  0.39 * shipment.weight;
        }else {
            // Package and Oversized
            let cost =  0.25 * shipment.weight;
            if(shipment instanceof Oversize){
                return cost+10;
            }
            return cost;
        }
    }    
} 

export class ChicagoSprintShipper implements IShipper{
    getCost(shipment:Shipment): number {
        if(shipment instanceof Letter){
            return 0.42 * shipment.weight;
        }else{
            //Package and oversize no charge
            return 0.20 * shipment.weight;
        }

    }
}

export class PacificParcelShipper implements IShipper{
    getCost(shipment:Shipment): number {
        if(shipment instanceof Letter){
            return 0.51 * shipment.weight;
        }else{
            //Package and oversized
            let cost = 0.20 * shipment.weight;
            if(shipment instanceof Oversize){
                return cost + 0.02*shipment.weight;
            }
            return cost;
        }
    }
}

export class FactoryStrategy {

    static  create(fromCode: string): IShipper{
        if(!fromCode){
            return new AirEastShipper();
        }

        const code = Number(fromCode.charAt(0));

        if(code>=1 && code<=3){
            return new AirEastShipper();
        }else if(code>=4 && code<=6){
            return new ChicagoSprintShipper();
        }else if(code>=7 && code<=9){
            return new PacificParcelShipper();
        }
        return new AirEastShipper();
    }
}