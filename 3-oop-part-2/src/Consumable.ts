import { Item } from "./Item";

export abstract class  Consumable extends Item{

    public isConsumed:boolean;
    private _isSpoiled:boolean;

    constructor(name:string, value:number, weight:number, isSpoiled:boolean){
        super(name,value,weight);
        this._isSpoiled = isSpoiled;
        this.isConsumed = false;
    }

    use(): string {

        const defaultMessage = `You consumed the ${this.name}.`;
        if(this.isConsumed){
            return `There's nothing left of the ${this.name} to consume.`;
        }

        return defaultMessage+((this._isSpoiled)?'\nYou feel sick.':'');
    }

    isSpoiled(){
        return this._isSpoiled;
    }
}