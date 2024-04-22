import { IShipper } from "./interfaces";

export class AirEastShipper implements IShipper{
    getCost(): number {
        return 39;
    }    
} 

export class ChicagoSprintShipper implements IShipper{
    getCost(): number {
        return 42;
    }
}

export class PacificParcelShipper implements IShipper{
    getCost(): number {
        return 51;
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