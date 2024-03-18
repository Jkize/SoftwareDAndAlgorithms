import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item>{
    
    public static idCounter:number =0;
    public readonly name:string;
    public value:number;
    public weight:number;
    private readonly id:number;

    constructor(name:string, value:number, weight:number){
        this.name = name;
        this.value = value;
        this.weight = weight;
        Item.idCounter+=1;
        this.id = Item.idCounter;
    }

    compareTo(other:Item){
        if(this.value!==other.value){
            return (this.value>other.value)?1:-1;
        }
        return this.name.toLowerCase().localeCompare(other.name.toLowerCase())
    }

    
    static resetIdCounter():void{
        this.idCounter = 0;
    }

    abstract use():void

    toString():string{
        return `${this.name} - Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
    }

    getId():number{
        return this.id;
    }

}