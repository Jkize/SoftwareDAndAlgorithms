import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape{

    constructor(pA:Point, pB:Point, pC:Point)
    constructor(pA:Point, pB:Point, pC:Point, color:string, filled:boolean)
    constructor(pA:Point, pB:Point, pC:Point, color?:string, filled?:boolean){

        if(color && filled!==undefined){
            super([pA,pB,pC],color,filled);
        }else{
            super([pA,pB,pC])
        }
    }
    
    toString(){
      return `Triangle[${this.points.map((point,index)=>`v${index+1}=${point.toString()}`).join(",")}]`;    
    }

    getType(){
        let sides = this.points.map((point,idx)=>point.distance(this.points[(idx+1)%3]));
       
        if ( this.areEqual(sides[0],sides[1]) && this.areEqual(sides[1],sides[2])) {
            return "equilateral triangle";
          } else if ( this.areEqual(sides[0],sides[1])  || this.areEqual(sides[1],sides[2]) || this.areEqual(sides[0],sides[2])) {
            return "isosceles triangle";
          } else {
            return "scalene triangle";
          }
    }

    //for float
    private areEqual(num1:number, num2:number){
      return Math.abs(num1-num2)<Number.EPSILON
    }

}