type NoEmptyArray<T> = Array<T> & { 0: T };
const getTailAndHead = <T>(list:T[]):[T,T] => [list[0], list[list.length-1]];
const objectKey = <O, K extends keyof O = keyof O>(field:K)=>(o1:O, o2:O) =>(o1[field]===o2[field]?0: o1[field]>o2[field]?1:-1)


const multiply = (a: number) => (b: number) => a * b; //const multiply = (a: number) => (b: number) => a * b;
const add = (a: number) => (b: number) => a + b;

[1, 2, 3].map(multiply(2)); // [2, 4, 6]
[1, 2, 3].map(add(2)); // [3, 4, 5]



const add2 = (x: number, y: number) => x + y;
add2(5, 4);
// into
const addCurried = (x: number) => (y: number) => x + y;
addCurried(5)(4);


