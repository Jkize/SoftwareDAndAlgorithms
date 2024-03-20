import { Consumable } from "./Consumable";

export class Pizza extends Consumable{

    public readonly numberOfSlices:number;
    private numberOfEatenSlices:number;

    constructor(value:number, weight:number, isSpoiled:boolean, numberOfSlices:number){
        super('pizza',value,weight,isSpoiled);
        this.numberOfSlices = numberOfSlices;
        this.numberOfEatenSlices = 0;
        if(this.numberOfSlices===this.numberOfEatenSlices){
            this.isConsumed = true;
        }
    }

    use(): string {
        if(this.numberOfEatenSlices<this.numberOfSlices){
            this.numberOfEatenSlices+=1;
            const message = super.use().replace("consumed the "+this.name,"consumed a slice of the "+this.name);

            if(this.numberOfEatenSlices === this.numberOfSlices){
                this.isConsumed = true;
            }
            return message;
        }
        return super.use();
    }

    getNumberOfEatenSlices():number{
        return this.numberOfEatenSlices;
    }
}