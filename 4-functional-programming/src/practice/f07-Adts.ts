/// Type classess and Algebraic Data

import { Student } from "./f02-arrows";

type  Equals = <T>(A:T,B:T)=>boolean;

interface Eq<T>{
    equals(a:T,b:T):boolean;
}

const eqNumber: Eq<number> ={
    equals:(a,b)=> a===b
}

enum Ordering {
    LESS = -1,
    EQUALS = 0,
    GREATER = 1,
  }
  
interface Ord<T> extends Eq<T> {
    compare: (a: T, b: T) => Ordering,
  }

  const byStudentScoreVOld: Ord<Student> & Eq<Student> = {
    compare: (a, b) => a.score === b.score
      ? Ordering.EQUALS
      : a.score > b.score
        ? Ordering.GREATER
        : Ordering.LESS,
    equals: (a, b) => a.score === b.score,
  };

  const ordNumber: Ord<number> = {
    compare: (a, b) => a === b
      ? Ordering.EQUALS
      : a > b
        ? Ordering.GREATER
        : Ordering.LESS,
    equals: (a, b) => a === b,
  };
  
  // You pass the function for transforming A to B, and then Ord<B>. Now you have Ord<A>
  const contramap = <A, B>(f: (a: A) => B) => (ord: Ord<B>): Ord<A> => ({
    equals: (a, b) => ord.equals(f(a), f(b)),
    compare: (a, b) => ord.compare(f(a), f(b)),
  });


  const byStudentScore: Ord<Student> = contramap(
    (student:Student) => student.score // function to map Student -> number
  )(ordNumber); // Ord for comparing two numbers
  
  const students = [
    { name: 'John', score: 10 },
    { name: 'Jane', score: 5 },
    { name: 'Jack', score: 7 },
  ];
  const sorted = [...students].sort(byStudentScore.compare);
  /**
   * Some info about contramap: It's a contravariant of Functor.map. When map makes F<A> -> F<B> transformation using morphism A -> B, 
   * contramap makes F<A> -> F<B> transformation using morphism B -> A. 
   * Here's a very demonstrative example of how contravariance works: stackoverflow.
   */