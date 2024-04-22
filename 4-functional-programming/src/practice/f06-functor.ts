import { compose } from "./f03-composition";

()=>{
    type A = number;
    type B = string;
    type C = boolean;
    
    const f = (a: A): B => a.toString(); // convert number to string
    const g = (b: B): C => b.length % 2 === 0; // is the string length an even number?
    
    const gf = compose(g, f);
    
    f(10) === '10';
    g('10') === true;
    
    gf(10) === true;
}

()=>{

    //Here's everything all right. But what if f would return not a B, but F<B>?
    type A = number;
    type B = string;
    type C = boolean;
    type F<T> = Array<T> // Unfortunately we cannot create an alias for generics (type constructors) 

    const f = (a: A): F<B> => [a.toString()];
    const g = (b: B): C => b.length % 2 === 0; // is the string length an even number?

    const gf = compose(g, f); // Error! The returned object of "f" is not assignable to the input object of "g"!  
}

//Functor 
()=>{
    // type Functor<Domain> = { 
    //     map:<ObjectA, ObjectB>( f:(a:ObjectA)=>ObjectB )=> (fa:Domain<ObjectA>) => Domain<ObjectB>;
    // }

    // type Functor<M> = {
    //     //          f: A -> B       map(f): F<A> -> F<B>
    //     map: <A, B>(f: (a: A) => B) => (fa: M<A>) => M<B>
    //   };
      



    const fA = (a: number): Array<string> => [a.toString()];
    const g = (b: string): boolean => b.length % 2 === 0;
    //const b= fA(10) === ['10'];

    functorArray.map(g)(fA(10)) // [true]
    functorArray.map(g)(['10', '222', '3', '1111']) /// [true, false, false, true];

    const gfA = compose(functorArray.map(g), fA);
    gfA(10)
    

    /**
     * # Our situation becomes more complex:
    f: A -> F<B>
    g: B -> C
            
    # We cannot create a composition, because the output of `f` is not a `B` but `F<B>`
    🛑 g ∘ f: A -> F<C>
            
    # But how Functor can help us? The Functor basically makes from morphism A -> B a new morphism F<A> -> F<B>
    F<g>: F<B> -> F<C>
            
    # But we can create a composition with the help of Functor
    ✅ F<g> ∘ f: A -> F<C>
     */
 
      
}

()=>{
    const task = <A>(a: A): Promise<A> => Promise.resolve(a);

    const fP = (a: number): Promise<string> => task(a.toString());
    const g = (b: string): boolean => b.length % 2 === 0;
    
    const gfP = compose(functorTask.map(g), fP);
    
    fP(10) === task('10');
    functorTask.map(g)(task('10')) === task(true);
    gfP(10) === task(true);
}

export  const functorArray = {
    map: <A, B>(f: (a: A) => B) => (fa: Array<A>) => (
      fa.map(f) // As you perfectly know, Array already has a map operator, so it means that Array in JS is a Functor by default!
    ),}

export const functorTask = {
    map:<A,B>(f:(a:A)=>B) => (fa:Promise<A>)=>(
        fa.then(f))
}

