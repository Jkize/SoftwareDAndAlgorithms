 ()=>{
    interface Student {
        name: string;
        score: number;
        class: string;
      };
      const students: Array<Student> = [
        { name: 'John', class: 'A', score: 50 },
        { name: 'James', class: 'A', score: 53 },
        { name: 'George', class: 'A', score: 86 },
        { name: 'John', class: 'B', score: 75 },
      ];
      
    // A => B
    const filterByClassA = (students:Array<Student>):Array<Student> => students.filter(students=>students.class==='A');
    // B => C
    const sortByScore = (students:Array<Student>):Array<Student> => [...students].sort((s1,s2)=>s1.score-s2.score);
    // C => D
    const getFirstAndLastStudent= (students:Array<Student>):[Student,Student] => [students[0],students[students.length-1]];
    
    
    
    


    const getLowestAndHighesScoreStudents = compose(
        getFirstAndLastStudent,
        sortByScore,
        filterByClassA
    )
    
    const [lowestScore, highestScore] = getLowestAndHighesScoreStudents(students);
    

 } 

 export type AnyFunction  = (...args:Array<any>)=>any;
  
 export function compose<A,B,C>( bc: (b:B)=>C, ab:(a:A)=>B ): (a:A)=>C
 export function compose<A,B,C,D>(cd:(c:C)=>D, bc:(b:B)=>C, ab:(a:A)=>B) : (a:A) => D
 export function compose(...fns:Array<AnyFunction>){
 
     return (a)=> (fns.reduceRight(
         (acc,fn)=>fn(acc),
         a
     ))
 
 }