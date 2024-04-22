import { compose } from "./f03-composition";

()=>{
    /**
     * objects are types (like string, number, boolean)
     * morphisms are functions (like function length(a:string):number)
     * ° is the function composition (like compose(length, duplicate))
     */

    const f = (a:number):string => a.toString();
    const g = (b:string):boolean => b.length%2===0;
    const h  = (c:boolean): 0 | 1 => c? 1 : 0;

    const fgh = compose(h, compose(g,f));
    const ghf = compose (compose(h,g),f);

    fgh(10) === ghf(10);
}