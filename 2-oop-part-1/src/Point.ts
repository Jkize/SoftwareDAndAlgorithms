export class Point{
    private x:number;
    private y:number;

    constructor()
    constructor(x?: number,y?:number){
        this.x = x || 0;
        this.y =  y || 0;
    }

    
    distance():number
    distance(x:number, y:number):number
    distance(other:Point):number
    distance(px?:any, y?:any):   number {

        let iX=0;
        let iY=0;

        if(typeof px === 'number'){
            iX = px; 
            iY = y;
        }

        if(px instanceof Point){
            iX = px.x
            iY = px.y
        }
        return  Math.sqrt( Math.pow( this.x - iX ,2) + Math.pow( this.y - iY ,2))
    }


    toString(){
        return `(${this.x}, ${this.y})`
    }
}