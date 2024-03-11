import { Point } from "./Point";

export abstract class Shape {

  protected color:string;
  protected filled:boolean;
  protected points:Point[]

  constructor(points:Point[])
  constructor(points:Point[], color:string, filled:boolean)
  constructor(points:Point[], color?:string, filled?:boolean){
    if(points.length<3){
      throw new Error('Points must to have >=3 points')
    }
    this.points = points;
    this.color = color || 'green';
    this.filled = (filled!== undefined)?filled :true;
  }

  getPerimeter(){
    return this.points.reduce((sumT,point,index)=> sumT+point.distance( this.points[(index+1)%this.points.length] ),0);
  }

  abstract getType(): string;

  toString(){
    return `A Shape with color of ${this.color} and ${this.filled ? 'filled':'not filled'}. Points: ${this.points.map((pt)=>pt.toString()).join(", ")}.`
  }
}
