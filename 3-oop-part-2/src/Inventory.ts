import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory{
    items:Item[];

    constructor(){
        this.items = [];
    }

    addItem(item:Item):void{
        this.items.push(item);
    }

    sort():void 
    sort(comparator:ItemComparator):void
    sort(comparator?:ItemComparator):void{
        this.items.sort((a,b)=> (comparator)? comparator.compare(a,b) :  a.compareTo(b));
    }

    toString():string{
        return this.items.join(', ');
    }

}